import React, { useState } from 'react';
import _ from 'lodash';

function App() {
  const [newSaldo, setNewSaldo] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [expanses, setExpanses] = useState([]);
  const [isSortedAsc, setIsSortedAsc] = useState(true);
  
  const sortOnDate = (type, list) => {
    let sortedList = [...list].sort((a, b) => {
      return isSortedAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date) ;
    }).reverse();

    if(type === 'expanses'){
      setExpanses(sortedList);
    }else{
      setIncomes(sortedList);
    }

    setIsSortedAsc(!isSortedAsc);

    return sortedList;
  }

  const addIncome = (event) => {
    event.preventDefault();

    const newIncome = {
      date: event.target.inkdate.value,
      desc: event.target.inkdesc.value,
      money: event.target.inkmoney.value
    }

    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
    event.target.reset();

    setNewSaldo((prevSaldo) => prevSaldo + parseFloat(newIncome.money));
  }

  const addExpanse = (event) => {
    event.preventDefault();

    const newExpanse = {
      "date": event.target.uitdate.value,
      "desc": event.target.uitdesc.value,
      "money": event.target.uitmoney.value
    }

    if(newSaldo - parseFloat(newExpanse.money) >= 0){
      setExpanses((prevExpanses) => [...prevExpanses, newExpanse]);
      event.target.reset();

      setNewSaldo((prevSaldo) => prevSaldo - parseFloat(newExpanse.money));
    }else{
      alert('Saldo wordt negatief. Kan deze uitgave niet toevoegen.')
    }

    
  }

  return (
    <React.Fragment>
      Vul hier het beginsaldo in: 
      <form method="POST" onSubmit={(e) => { e.preventDefault(); setNewSaldo(parseFloat(e.target.beginSaldo.value)); e.target.reset(); }}>
        <input type="text" name="beginSaldo" />
        <input type="submit" name="submit" value="toevoegen" />
      </form>

      <div className='saldo'>Saldo: {newSaldo}</div>

      <div className='inkomsten'>
        <h3>Inkomsten</h3>
        <table>
          <thead>
            <tr>
              <th onClick={() => { sortOnDate('incomes', incomes) }}>Datum</th>
              <th>Beschrijving</th>
              <th>Bedrag</th>
            </tr>
          </thead>
          <tbody>
              {incomes.map(item => {
                return(
                  <tr>
                    <td>{item.date}</td>
                    <td>{item.desc}</td>
                    <td>{item.money}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>

        <form method="POST" onSubmit={(event) => addIncome(event)}>
          <table>
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
                <td><input type='text' name='inkdate' id='inkdate' /></td>
                <td><input type='text' name='inkdesc' id='inkdesc' /></td>
                <td><input type='text' name='inkmoney' id='inkmoney' /></td>
                <td><input type="submit" name="submit" value="toevoegen" /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      <div className='uitgaven'>
        <h3>Uitgaven</h3>

        <table>
          <thead>
            <tr>
              <th onClick={() => { sortOnDate('expanses', expanses) }}>Datum</th>
              <th>Beschrijving</th>
              <th>Bedrag</th>
            </tr>
          </thead>
          <tbody>
            {expanses.map(item => {
                return(
                  <tr>
                    <td>{item.date}</td>
                    <td>{item.desc}</td>
                    <td>{item.money}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>

        <form method="POST" onSubmit={(event) => addExpanse(event)}>
          <table>
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
                <td><input type='text' name='uitdate' id='uitdate' /></td>
                <td><input type='text' name='uitdesc' id='uitdesc' /></td>
                <td><input type='text' name='uitmoney' id='uitmoney' /></td>
                <td><input type="submit" name="submit" value="toevoegen" /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>


    </React.Fragment>
  )
}

export default App
