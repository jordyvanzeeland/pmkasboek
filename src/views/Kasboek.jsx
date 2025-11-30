import React, { useEffect, useRef, useState } from 'react';
import "../assets/style.css";
import "../assets/print.css";
import moment from 'moment';
import { getUserAmounts, getBookAmounts } from '../data/Amounts';
import { getUserSaldo, updateUserSaldos } from '../data/Saldos';
import withAuth from '../components/withAuth';
import Sidebar from '../components/Sidebar';
import MonthSelector from '../components/MonthSelector';
import Saldo from '../components/Saldo';
import Amounts from '../components/Amounts';
import { parseAmount, sortOnDate } from '../Functions';
import Header from '../components/Header';
moment.locale('nl');

const Kasboek = (props) => {
  const [beginSaldo, setBeginSaldo] = useState(0);
  const [currentBookYear, setCurrentBookYear] = useState(0);

  const [currentBook, setCurrentBook] = useState([]);
  const [beginMonth, setBeginMonth] = useState(0);
  const [currentActiveMonth, setCurrentActiveMonth] = useState(0);
  const [monthlySaldo, setMonthlySaldo] = useState(Array(12).fill(0));
  const [useramounts, setUseramounts] = useState({ incomes: [], expanses: [] });
  const [selectedMonth, setSelectedMonth] = useState(1);
  const printRef = useRef();

  const formats = ["DD-MM-YYYY"];
  let filteredAll = useramounts.all?.filter(amount => moment(amount.date, formats, true).month() + 1 === selectedMonth);
  filteredAll = filteredAll?.length > 0 ? sortOnDate(filteredAll, false) : filteredAll;

  const filteredIncomes = useramounts.incomes.filter(income => moment(income.date, formats, true).month() + 1 === selectedMonth);
  const filteredExpanses = useramounts.expanses.filter(expanse => moment(expanse.date, formats, true).month() + 1 === selectedMonth);

  const getBookYearAmounts = async(bookid) => {
    try {
      const amounts = await getBookAmounts(bookid);
      setUseramounts({
        all: amounts,
        incomes: amounts.filter(amount => amount.type.id === 1),
        expanses: amounts.filter(amount => amount.type.id === 2)
      });
    } catch (error) {
        console.error("Error fetching user amounts:", error);
    }
  }

  const getData = async () => {
    if (props.router.bookid) {
      getBookYearAmounts(props.router.bookid);
    }
  }

  useEffect(() => {
    if (props.router.bookid) {
      getBookYearAmounts(props.router.bookid);

      getUserSaldo(props.router.bookid).then((bookSaldo) => {
        setBeginSaldo(bookSaldo.startsaldo);
        setCurrentBook(bookSaldo);
      });
    }
  }, [props.router.bookid]);

  useEffect(() => {
    const newSaldos = Array(12).fill(0);
    let runningSaldo = 0;
  
    for (let month = 0; month < 12; month++) {
      const monthIncomes = useramounts.incomes.filter(amount => moment(amount.date, formats, true).month() === month);
      const monthExpanses = useramounts.expanses.filter(amount => moment(amount.date, formats, true).month() === month);
  
      const incomeTotal = monthIncomes.reduce((total, income) => total + parseAmount(income.amount) ,0);
      const expanseTotal = monthExpanses.reduce((total, expanse) => total + parseAmount(expanse.amount), 0);
  
      if (month === beginMonth) {
        runningSaldo = beginSaldo + incomeTotal - expanseTotal;
      } else if (month > beginMonth) {
        runningSaldo += incomeTotal - expanseTotal;
      }
  
      newSaldos[month] = runningSaldo;
    }

    setCurrentActiveMonth(document.querySelector('li.active') ? document.querySelector('li.active').textContent : '');
  
    setMonthlySaldo([...newSaldos]);
  }, [useramounts, beginSaldo, beginMonth, currentActiveMonth]);

  return (
    <React.Fragment>
      <Header />

      <div className='pdf-loader-screen'></div>
      <div className="content" style={{ marginLeft: 0 }} ref={printRef}>
        <Saldo currentActiveMonth={currentActiveMonth} currentBook={currentBook} setBeginSaldo={setBeginSaldo} monthlySaldo={monthlySaldo} selectedMonth={selectedMonth}/>
        <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} setCurrentActiveMonth={setCurrentActiveMonth} />   

        <div className='amounts showPrint'>
              <h3>Kasboek - {document.getElementsByClassName('user')[0]?.innerHTML} - {currentActiveMonth} {currentBook.bookyear}</h3>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Datum</th>
                    <th>Omschrijving</th>
                    <th>Ontvangst</th>
                    <th>Uitgave</th>
                    <th>Code</th>
                  </tr>
                  <tr>
                    <th></th>
                    <th>Beginsaldo</th>
                    <th>{selectedMonth - 1 !== 0 ? monthlySaldo[selectedMonth - 2]?.toFixed(2).replace(".", ","): beginSaldo}</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAll?.map(amount => {
                    return(
                      <React.Fragment>
                        <tr>
                          <td>{amount.date}</td>
                          <td>{amount.description}</td>
                          <td>{amount.type?.id === 1 ? amount.amount : ''}</td>
                          <td>{amount.type?.id === 2 ? amount.amount : ''}</td>
                          <td style={{width: "15%"}}><input id={`amountcode-${amount.id}`} data-id={amount.id} onChange={(event) => updateAmountCode(amount.id, event.target.value)} className="form-control" type='text' defaultValue={amount.code}/></td>
                        </tr>
                      </React.Fragment>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Eindsaldo</th>
                    <th>{monthlySaldo[selectedMonth - 1]?.toFixed(2).replace(".", ",")}</th>
                    <th></th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
              </div>

        <div className='row noPrint'>
          <div className='col-md-6'>
            <Amounts type="1" filteredAmounts={filteredIncomes} getData={getData} bookid={props.router.bookid} />
          </div>

          <div className='col-md-6'>
            <Amounts type="2" filteredAmounts={filteredExpanses} getData={getData} bookid={props.router.bookid} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default withAuth(Kasboek)
