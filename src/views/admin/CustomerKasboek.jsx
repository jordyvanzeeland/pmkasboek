import React, { useEffect, useRef, useState } from 'react';
import "../../assets/admin.css";
import moment from 'moment';
import { getUserSaldo } from '../../data/Saldos';
import withAuth from '../../components/withAuth';
import MonthSelector from '../../components/MonthSelector';
import Saldo from '../../components/Saldo';
import Amounts from '../../components/Amounts';
import { parseAmount, getUser } from '../../Functions';
import Header from '../../components/Header';
import { getUserBookAmounts } from '../../data/Admin';
import Forbidden from '../../components/Forbidden';
import Loader from '../../components/Loader';
moment.locale('nl');

const CustomerKasboek = (props) => {
  const [userIsAdmin, setUserIsAdmin] = useState(0);
  const [noAccess, setNoAccess] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [beginSaldo, setBeginSaldo] = useState(0);
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

  const getBookYearAmounts = async(bookid, customerid) => {
    try {
      const amounts = await getUserBookAmounts(bookid, customerid);
      console.log(amounts);
      setUseramounts({
        incomes: amounts.filter(amount => amount.type.id === 1),
        expanses: amounts.filter(amount => amount.type.id === 2)
      });
    } catch (error) {
        console.error("Error fetching user amounts:", error);
    }
  }

  const getData = async () => {
    setShowLoader(true);
    const user = await getUser();
    
    if(user.isAdmin === 1){
        setUserIsAdmin(user.isAdmin);
        
        try {
          if (props.router.bookid) {
            getBookYearAmounts(props.router.bookid, props.router.customerid);

            getUserSaldo(props.router.bookid).then((bookSaldo) => {
              setBeginSaldo(bookSaldo.startsaldo);
              setCurrentBook(bookSaldo);
            });

            document.querySelector('.loader_container').style.display = "none";
          }
        } catch (error) {
            console.error("Error fetching user books:", error);
        }
    }else{
      setNoAccess(true);
    }

    setShowLoader(false);
  }

  useEffect(() => {
    getData();
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
      <Header isAdmin="true"/>
      {showLoader && (<Loader />)}

      <div className='pdf-loader-screen'></div>
      <div className="content" style={{ marginLeft: 0 }} ref={printRef}>
        {noAccess && (<Forbidden />)}

        {!noAccess && userIsAdmin === 1 && (
          <React.Fragment>
            <Saldo currentActiveMonth={currentActiveMonth} currentBook={currentBook} setBeginSaldo={setBeginSaldo} monthlySaldo={monthlySaldo} selectedMonth={selectedMonth} admin="true"/>
            <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} setCurrentActiveMonth={setCurrentActiveMonth} />   

            <div className='row'>
              <div className='col-md-6'>
                <Amounts type="1" filteredAmounts={filteredIncomes} getData={getData} bookid={props.router.bookid} admin="true"/>
              </div>

              <div className='col-md-6'>
                <Amounts type="2" filteredAmounts={filteredExpanses} getData={getData} bookid={props.router.bookid} admin="true"/>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}

export default withAuth(CustomerKasboek)
