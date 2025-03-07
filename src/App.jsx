import React, { useState } from 'react';
import "./assets/style.css";

function App() {
  const [newSaldo, setNewSaldo] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [expanses, setExpanses] = useState([]);
  const [isSortedDateAsc, setIsSortedDateAsc] = useState(true);
  const [isSortedAmountAsc, setIsSortedAmountAsc] = useState(true);

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

  const addIncome = (event) => {
    event.preventDefault();

    const newIncome = {
      date: event.target.inkdate.value,
      desc: event.target.inkdesc.value,
      money: event.target.inkmoney.value
    }

    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
    event.target.reset();

    setNewSaldo((prevSaldo) => prevSaldo + parseFloat(newIncome.money.replace(",", ".")));
  }

  const addExpanse = (event) => {
    event.preventDefault();

    const newExpanse = {
      "date": event.target.uitdate.value,
      "desc": event.target.uitdesc.value,
      "money": event.target.uitmoney.value
    }

    if (newSaldo - parseFloat(newExpanse.money) >= 0) {
      setExpanses((prevExpanses) => [...prevExpanses, newExpanse]);
      event.target.reset();

      setNewSaldo((prevSaldo) => prevSaldo - parseFloat(newExpanse.money.replace(",", ".")));
    } else {
      alert('Saldo wordt negatief. Kan deze uitgave niet toevoegen.')
    }


  }

  return (
    <React.Fragment>
      <div class="container">
        <div className="logo">
          <span>PM</span>Kasboek
        </div>

        <div className='row'>
          <div className='col-md-6'>
            Vul hier het beginsaldo in:
            <form method="POST" onSubmit={(e) => { 
              e.preventDefault(); 
              setNewSaldo(parseFloat(e.target.beginSaldo.value.replace(",", "."))) }}>
              <input type="text" name="beginSaldo" />
              <input type="submit" name="submit" value="toevoegen" />
            </form>
          </div>

          <div className='col-md-6'>
            <div className='saldo'>Saldo: &euro; {newSaldo.toString().replace(".", ",")}</div>
          </div>
        </div>


        <div className='row'>
          <div className='col-md-6'>
            <div className='inkomsten'>
              <h3>Inkomsten</h3>

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

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th onClick={() => { sortOnDate('incomes', incomes) }}>Datum</th>
                    <th>Beschrijving</th>
                    <th onClick={() => { sortOnAmount('incomes', incomes) }}>Bedrag</th>
                  </tr>
                </thead>
                <tbody>
                  {incomes.map(item => {
                    return (
                      <tr>
                        <td>{item.date}</td>
                        <td>{item.desc}</td>
                        <td>{item.money}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='uitgaven'>
              <h3>Uitgaven</h3>

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

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th onClick={() => { sortOnDate('expanses', expanses) }}>Datum</th>
                    <th>Beschrijving</th>
                    <th onClick={() => { sortOnAmount('expanses', expanses) }}>Bedrag</th>
                  </tr>
                </thead>
                <tbody>
                  {expanses.map(item => {
                    return (
                      <tr>
                        <td>{item.date}</td>
                        <td>{item.desc}</td>
                        <td>{item.money}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
