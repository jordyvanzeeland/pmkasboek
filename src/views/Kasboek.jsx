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
import { parseAmount } from '../Functions';
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
  const filteredIncomes = useramounts.incomes.filter(income => moment(income.date, formats, true).month() + 1 === selectedMonth);
  const filteredExpanses = useramounts.expanses.filter(expanse => moment(expanse.date, formats, true).month() + 1 === selectedMonth);

  const getBookYearAmounts = async(bookid) => {
    try {
      const amounts = await getBookAmounts(bookid);
      setUseramounts({
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

        <div className='row'>
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
