import React, { useCallback, useEffect, useRef, useState } from 'react';
import _ from 'lodash';

function App() {
  const inputRef = useRef();
  const [saldo, setSaldo] = useState(0);
  const [newSaldo, setNewSaldo] = useState(0);
  const [incomes, setIncomes] = useState([])
  
  const addIncome = (event) => {
    event.preventDefault();

    const newIncome = {
      "date": event.target.inkdate.value,
      "desc": event.target.inkdesc.value,
      "money": event.target.inkmoney.value
    }

    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
    event.target.reset();

    setNewSaldo((prevSaldo) => prevSaldo + parseFloat(newIncome.money));
  }

  const addExpanse = (event) => {
    expansesList.push({
      "date": event.target.uitdate.value,
      "desc": event.target.uitdesc.value,
      "money": event.target.uitmoney.value
    })
  }

  return (
    <React.Fragment>
      Vul hier het beginsaldo in: 
      <form method="POST" onSubmit={(e) => { e.preventDefault(); setNewSaldo(parseFloat(e.target.beginSaldo.value)); e.target.reset();}}>
        <input type="text" name="beginSaldo" />
        <input type="submit" name="submit" value="toevoegen" />
      </form>

      <div className='saldo'>Saldo: {newSaldo}</div>

      <div className='inkomsten'>
        <h3>Inkomsten</h3>
        <table>
          <thead>
            <tr>
              <th>Datum</th>
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
              <th>Datum</th>
              <th>Beschrijving</th>
              <th>Bedrag</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type='text' name='uitdate' id='uitdate' /></td>
              <td><input type='text' name='uitdesc' id='uitdesc' /></td>
              <td><input type='text' name='uitmoney' id='uitmoney' onChange={(e) => removeFromSaldo(e.target.value)} /></td>
            </tr>
          </tbody>
        </table>
      </div>


    </React.Fragment>
  )
}

export default App
