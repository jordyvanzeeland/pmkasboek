import React, { useEffect, useState } from 'react';
import { debounce } from "lodash";
import "./assets/style.css";

function App() {
  const [newSaldo, setNewSaldo] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [expanses, setExpanses] = useState([]);
  const [isSortedDateAsc, setIsSortedDateAsc] = useState(true);
  const [isSortedAmountAsc, setIsSortedAmountAsc] = useState(true);
  const [inctotal, setInctotal] = useState(0);
  const [outtotal, setOuttotal] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);

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
      return isSortedAmountAsc ? a.money - b.money : b.money - a.money;
    }).reverse();

    if (type === 'expanses') {
      setExpanses(sortedList);
    } else {
      setIncomes(sortedList);
    }

    setIsSortedAmountAsc(!isSortedAmountAsc);

    return sortedList;
  }

  const updateRow = debounce((event, type, id) => {
    const typeArray = type === "expanses" ? expanses : incomes;
    const updateItem = typeArray.find((item) => item.id === id);

    const updateDate = event.target.parentNode.parentNode.children[0].children[0].value;
    const updateCode = event.target.parentNode.parentNode.children[1].children[0].value;
    const updateDesc = event.target.parentNode.parentNode.children[2].children[0].value;
    const updateMoney = event.target.parentNode.parentNode.children[3].children[0].value;

    if(updateItem){
      typeArray[id - 1] = {
        date: updateDate,
        code: updateCode,
        desc: updateDesc,
        money: updateMoney
      }
    }

    if(type === 'expanses'){
      setExpanses([...typeArray]);
      setOuttotal((prevOuttotal) => prevOuttotal - parseFloat(updateMoney.replace(",", ".")));
      setNewSaldo((prevSaldo) => prevSaldo - parseFloat(updateMoney.replace(",", ".")));
    }else{
      setIncomes([...typeArray]);
      setInctotal((prevInctotal) => prevInctotal + parseFloat(updateMoney.replace(",", ".")));
      setNewSaldo((prevSaldo) => prevSaldo + parseFloat(updateMoney.replace(",", ".")));
    }
  }, 500)

  const deleteAmount = (type, id) => {
    const typeArray = type === "expanses" ? expanses : incomes;
    const updatedArray = typeArray.filter((item) => item.id !== id);
    const deletedItem = typeArray.find((item) => item.id === id);

    if (deletedItem) {
      if(type === 'expanses'){
        setExpanses(updatedArray);
        setOuttotal((prevOuttotal) => prevOuttotal - parseFloat(deletedItem.money.replace(",", ".")));
        setNewSaldo((prevSaldo) => prevSaldo + parseFloat(deletedItem.money.replace(",", ".")));
      }else{
        setIncomes(updatedArray);
        setInctotal((prevInctotal) => prevInctotal - parseFloat(deletedItem.money.replace(",", ".")));
        setNewSaldo((prevSaldo) => prevSaldo - parseFloat(deletedItem.money.replace(",", ".")));
      }  
    }
  }

  const addIncome = (event) => {
    event.preventDefault();

    const newIncome = {
      id: incomes.length + 1,
      date: event.target.inkdate.value,
      code: event.target.inkcode.value,
      desc: event.target.inkdesc.value,
      money: event.target.inkmoney.value
    }

    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
    event.target.reset();

    setInctotal((prevInctotal) => prevInctotal + parseFloat(newIncome.money.replace(",", ".")));
    setNewSaldo((prevSaldo) => prevSaldo + parseFloat(newIncome.money.replace(",", ".")));
  }

  const addExpanse = (event) => {
    event.preventDefault();

    const newExpanse = {
      id: expanses.length + 1,
      date: event.target.uitdate.value,
      code: event.target.uitcode.value,
      desc: event.target.uitdesc.value,
      money: event.target.uitmoney.value
    }

    if (newSaldo - parseFloat(newExpanse.money) >= 0) {
      setExpanses((prevExpanses) => [...prevExpanses, newExpanse]);
      event.target.reset();

      setOuttotal((prevOuttotal) => prevOuttotal + parseFloat(newExpanse.money.replace(",", ".")));
      setNewSaldo((prevSaldo) => prevSaldo - parseFloat(newExpanse.money.replace(",", ".")));
    } else {
      alert('Saldo wordt negatief. Kan deze uitgave niet toevoegen.')
    }
  }

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className='months'>
          <ul>
            <li onClick={() => setSelectedMonth(1)} className={selectedMonth === 1 ? "active" : ''} value="1">Januari</li>
            <li onClick={() => setSelectedMonth(2)} className={selectedMonth === 2 ? "active" : ''} value="2">Februari</li>
            <li onClick={() => setSelectedMonth(3)} className={selectedMonth === 3 ? "active" : ''} value="3">Maart</li>
            <li onClick={() => setSelectedMonth(4)} className={selectedMonth === 4 ? "active" : ''} value="4">April</li>
            <li onClick={() => setSelectedMonth(5)} className={selectedMonth === 5 ? "active" : ''} value="5">Mei</li>
            <li onClick={() => setSelectedMonth(6)} className={selectedMonth === 6 ? "active" : ''} value="6">Juni</li>
            <li onClick={() => setSelectedMonth(7)} className={selectedMonth === 7 ? "active" : ''} value="7">Juli</li>
            <li onClick={() => setSelectedMonth(8)} className={selectedMonth === 8 ? "active" : ''} value="8">Augustus</li>
            <li onClick={() => setSelectedMonth(9)} className={selectedMonth === 9 ? "active" : ''} value="9">September</li>
            <li onClick={() => setSelectedMonth(10)} className={selectedMonth === 10 ? "active" : ''} value="10">Oktober</li>
            <li onClick={() => setSelectedMonth(11)} className={selectedMonth === 11 ? "active" : ''} value="11">November</li>
            <li onClick={() => setSelectedMonth(12)} className={selectedMonth === 12 ? "active" : ''} value="12">December</li>
          </ul>
        </div>

        <div className="logo">
          <span>PM</span>Kasboek
        </div>

        <div className='currentsaldo'>
        <div className='row'>
          
            <div className='col-md-6'>
              Boekjaar: <input className="form-control bookYear" type="text" name="bookYear" />
              Beginsaldo: <input className='form-control beginSaldo' type="text" name="beginSaldo" onChange={(e) => setNewSaldo(parseFloat(e.target.value.replace(",", ".")))} />
            </div>

            <div className='col-md-6'>
              <div className='saldo'>Totaal saldo: &euro; {newSaldo.toString().replace(".", ",")}</div>
            </div>
          </div>
        </div>


        <div className='row'>
          <div className='col-md-6'>
            <div className='inkomsten'>
              <h3>Inkomsten <span style={{ float: "right" }}>Totaal: &euro; {inctotal}</span></h3>

              <form method="POST" onSubmit={(event) => addIncome(event)}>
                <table className='table'>
                  <thead>
                    <tr>
                      <th onClick={() => { sortOnDate('incomes', incomes) }}>Datum</th>
                      <th>Beschrijving</th>
                      <th>Code</th>
                      <th onClick={() => { sortOnAmount('incomes', incomes) }}>Bedrag</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input className='form-control' type='text' name='inkdate' id='inkdate' /></td>
                      <td><input className='form-control' type='text' name='inkdesc' id='inkdesc' /></td>
                      <td><input className='form-control' type='text' name='inkcode' id='inkcode' /></td>
                      <td><input className='form-control' type='text' name='inkmoney' id='inkmoney' /></td>
                      <td><input className='form-control' type="submit" name="submit" value="Toevoegen" /></td>
                    </tr>
                    {incomes.map(item => {
                      return (
                        <tr>
                          <td><input id={`incdate-${item.id}`} data-id={item.id} onChange={(event) => updateRow(event, 'incomes', item.id)} className='form-control' type='text' value={item.date}/></td>
                          <td><input id={`incdesc-${item.id}`} data-id={item.id} onChange={(event) => updateRow(event, 'incomes', item.id)}  className='form-control' type='text' value={item.desc}/></td>
                          <td><input id={`inccode-${item.id}`} data-id={item.id} onChange={(event) => updateRow(event, 'incomes', item.id)}  className='form-control' type='text' value={item.code}/></td>
                          <td><input id={`incmoney-${item.id}`} data-id={item.id} onChange={(event) => updateRow(event, 'incomes', item.id)} className='form-control' type='text' defaultValue={item.money}/></td>
                          <td><span className='form-control' onClick={() => deleteAmount("incomes", item.id)}>Verwijderen</span></td>
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
              <h3>Uitgaven <span style={{ float: "right" }}>Totaal: &euro; {outtotal}</span></h3>

              <form method="POST" onSubmit={(event) => addExpanse(event)}>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Datum</th>
                      <th>Beschrijving</th>
                      <th>Code</th>
                      <th>Bedrag</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input className='form-control' type='text' name='uitdate' id='uitdate' /></td>
                      <td><input className='form-control' type='text' name='uitdesc' id='uitdesc' /></td>
                      <td><input className='form-control' type='text' name='uitcode' id='uitcode' /></td>
                      <td><input className='form-control' type='text' name='uitmoney' id='uitmoney' /></td>
                      <td><input className='form-control' type="submit" name="submit" value="Toevoegen" /></td>
                    </tr>
                    {expanses.map(item => {
                      return (
                        <tr>
                        <td><input className='form-control' type='text' name='outdate' id={`outdate-${item.id}`} data-id={item.id} value={item.date}/></td>
                        <td><input className='form-control' type='text' name='outdesc' id={`outdesc-${item.id}`} data-id={item.id} value={item.desc}/></td>
                        <td><input className='form-control' type='text' name='outcode' id={`outcode-${item.id}`} data-id={item.id} value={item.code}/></td>
                        <td><input className='form-control' type='text' name='outmoney' id={`outmoney-${item.id}`} data-id={item.id} defaultValue={item.money}/></td>
                        <td><span className='form-control' onClick={() => deleteAmount("expanses", item.id)}>Verwijderen</span></td>
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

export default App
