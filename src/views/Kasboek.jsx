import React, { useEffect, useState } from 'react';
import { debounce } from "lodash";
import "../assets/style.css";
import moment from 'moment';
import { getUserAmounts, updateUserAmount, deleteUserAmount, insertUserAmount } from '../data/Amounts';
import withAuth from '../components/withAuth';
moment.locale('nl');

const Kasboek = (props) => {
  const [newSaldo, setNewSaldo] = useState(0);
  const [beginSaldo, setBeginSaldo] = useState(0);
  const [beginMonth, setBeginMonth] = useState(0);
  const [monthlySaldo, setMonthlySaldo] = useState(Array(12).fill(0));
  const [useramounts, setUseramounts] = useState({
    incomes: [],
    expanses: []
  });

  const [incomes, setIncomes] = useState([]);
  const [expanses, setExpanses] = useState([]);
  const [isSortedDateAsc, setIsSortedDateAsc] = useState(true);
  const [isSortedAmountAsc, setIsSortedAmountAsc] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(1);

  const parseAmount = (value) => {
    if (typeof value === "string") {
      return parseFloat(value.replace(",", "."));
    } else if (typeof value === "number") {
      return value;
    }
    return 0;
  };

  const formats = ["DD-MM-YYYY", "YYYY-MM-DD"];
  const filteredIncomes = useramounts.incomes.filter(income => moment(income.date, formats, true).month() + 1 === selectedMonth);
  const filteredExpanses = useramounts.expanses.filter(expanse => moment(expanse.date, formats, true).month() + 1 === selectedMonth);

  const filteredinctotal = filteredIncomes.reduce((total, income) => total + parseAmount(income.amount), 0);
  const filteredouttotal = filteredExpanses.reduce((total, expanse) => total + parseAmount(expanse.amount), 0);

  const sortOnDate = (type, list) => {
    let sortedList = [...list].sort((a, b) => {
      return isSortedDateAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    }).reverse();

    if (type === 'expanses') {
      setExpanses(sortedList);
    } else {
      setIncomes(sortedList);
    }

    setIsSortedDateAsc(!isSortedDateAsc);

    return sortedList;
  }

  const sortOnAmount = (type, list) => {
    let sortedList = [...list].sort((a, b) => {
      return isSortedAmountAsc ? parseAmount(a.amount) - parseAmount(b.amount) : parseAmount(b.amount) - parseAmount(a.amount);
    })

    if (type === 'expanses') {
      setExpanses(sortedList);
    } else {
      setIncomes(sortedList);
    }

    setIsSortedAmountAsc(!isSortedAmountAsc);

    return sortedList;
  }

  const updateRow = debounce(async (event, type, id) => {
    const updateDate = event.target.parentNode.parentNode.children[0].children[0].value;
    const updateDesc = event.target.parentNode.parentNode.children[1].children[0].value;
    const updateMoney = event.target.parentNode.parentNode.children[2].children[0].value;
    const parsedMoney = parseFloat(updateMoney.replace(",", ".")) || 0;

    await updateUserAmount(id, updateDate, updateDesc, parsedMoney, type);
    await getData(props.router.bookid);
  }, 500)

  const deleteAmount = async (type, id) => {
    await deleteUserAmount(id);
    await getData(props.router.bookid);
  }

  const addAmount = async(event, type) => {
    event.preventDefault();
    const insertDate = type === 1 ? event.target.inkdate.value: event.target.uitdate.value;
    const insertDesc = type === 1 ? event.target.inkdesc.value: event.target.uitdesc.value;
    const insertAmount = type === 1 ? event.target.inkmoney.value: event.target.uitmoney.value;
    const bookid = props.router.bookid;
    const parsedAmount = parseFloat(insertAmount.replace(",", ".")) || 0;

    await insertUserAmount(insertDate, insertDesc, parsedAmount, type, bookid);

    event.target.reset();
    await getData(props.router.bookid);
  }

  const getBookYearAmounts = async(bookid) => {
    try {
      const amounts = await getUserAmounts(bookid);
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
    getData();
  }, [props.router.bookid]);

  useEffect(() => {
    if (!useramounts?.incomes || !useramounts?.expanses) return;
  
    const newSaldos = Array(12).fill(0);
    let runningSaldo = 0;
  
    for (let month = 0; month < 12; month++) {
      const monthIncomes = useramounts.incomes.filter(amount => moment(amount.date, formats, true).month() === month);
      const monthExpanses = useramounts.expanses.filter(amount => moment(amount.date, formats, true).month() === month);
  
      const incomeTotal = monthIncomes.reduce((total, income) => total + parseAmount(income.amount) ,0);
      const expanseTotal = monthExpanses.reduce((total, expanse) => total + parseAmount(expanse.amount), 0);

      console.log(incomeTotal, expanseTotal);
  
      if (month === beginMonth) {
        runningSaldo = beginSaldo + incomeTotal - expanseTotal;
      } else if (month > beginMonth) {
        runningSaldo += incomeTotal - expanseTotal;
      }
  
      newSaldos[month] = runningSaldo;
    }
  
    setMonthlySaldo([...newSaldos]);
  }, [useramounts, beginSaldo, beginMonth]);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className='months'>
          <ul>
            {[...Array(12)].map((_, index) => {
              const month = index + 1;
              const monthName = new Date(0, month - 1).toLocaleString('default', { month: 'long' });
              const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

              return (
                <li key={month} onClick={() => setSelectedMonth(month)} className={selectedMonth === month ? "active" : ''}>
                  {capitalizedMonth}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="logo">
          <span>PM</span>Kasboek
        </div>

        <div className='currentsaldo'>
        <div className='row'>
          
            <div className='col-md-6'>
              Boekjaar: <input className="form-control bookYear" type="text" name="bookYear" />
              Beginsaldo: <input className='form-control beginSaldo' type="text" name="beginSaldo" onChange={(e) => setBeginSaldo(parseFloat(e.target.value.replace(",", ".")))} />
            </div>

            <div className='col-md-6'>
              <div className='saldo'>Totaal saldo: &euro; {monthlySaldo[selectedMonth - 1]?.toFixed(2).replace(".", ",")}</div>
            </div>
          </div>
        </div>


        <div className='row'>
          <div className='col-md-6'>
            <div className='inkomsten'>
              <h3>Inkomsten <span style={{ float: "right" }}>Totaal: &euro; {filteredinctotal}</span></h3>

              <form method="POST" onSubmit={(event) => addAmount(event, 1)}>
                <table className='table'>
                  <thead>
                    <tr>
                      <th onClick={() => { sortOnDate('incomes', incomes) }}>Datum</th>
                      <th>Beschrijving</th>
                      <th onClick={() => { sortOnAmount('incomes', incomes) }}>Bedrag</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input className='form-control' type='text' name='inkdate' id='inkdate' /></td>
                      <td><input className='form-control' type='text' name='inkdesc' id='inkdesc' /></td>
                      <td><input className='form-control' type='text' name='inkmoney' id='inkmoney' /></td>
                      <td><input className='form-control' type="submit" name="submit" value="Toevoegen" /></td>
                    </tr>
                    {filteredIncomes.map(item => {
                      return (
                        <tr key={item.id}>
                          <td><input id={`incdate-${item.id}`} data-id={item.id} onChange={(event) => updateRow(event, 1, item.id)} className='form-control' type='text' defaultValue={item.date}/></td>
                          <td><input id={`incdesc-${item.id}`} data-id={item.id} onChange={(event) => updateRow(event, 1, item.id)}  className='form-control' type='text' defaultValue={item.description}/></td>
                          <td><input id={`incmoney-${item.id}`} data-id={item.id} onChange={(event) => updateRow(event, 1, item.id)} className='form-control' type='text' defaultValue={item.amount}/></td>
                          <td><span className='form-control btn-delete' onClick={() => deleteAmount("incomes", item.id)}>Verwijderen</span></td>
                        </tr>
                      )
                  })}
                  </tbody>
                </table>
              </form>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='uitgaven'>
              <h3>Uitgaven <span style={{ float: "right" }}>Totaal: &euro; {filteredouttotal}</span></h3>

              <form method="POST" onSubmit={(event) => addAmount(event, 2)}>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Datum</th>
                      <th>Beschrijving</th>
                      <th>Bedrag</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input className='form-control' type='text' name='uitdate' id='uitdate' /></td>
                      <td><input className='form-control' type='text' name='uitdesc' id='uitdesc' /></td>
                      <td><input className='form-control' type='text' name='uitmoney' id='uitmoney' /></td>
                      <td><input className='form-control' type="submit" name="submit" value="Toevoegen" /></td>
                    </tr>
                    {filteredExpanses.map(item => {
                      return (
                        <tr>
                        <td><input className='form-control' onChange={(event) => updateRow(event, 'expanses', item.id)} type='text' id={`outdate-${item.id}`} data-id={item.id} defaultValue={item.date}/></td>
                        <td><input className='form-control' onChange={(event) => updateRow(event, 'expanses', item.id)} type='text' id={`outdesc-${item.id}`} data-id={item.id} defaultValue={item.description}/></td>
                        <td><input className='form-control' onChange={(event) => updateRow(event, 'expanses', item.id)} type='text' id={`outmoney-${item.id}`} data-id={item.id} defaultValue={item.amount}/></td>
                        <td><span className='form-control btn-delete' onClick={() => deleteAmount("expanses", item.id)}>Verwijderen</span></td>
                      </tr>
                      )
                  })}
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default withAuth(Kasboek)
