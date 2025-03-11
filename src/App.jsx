import React, { useState } from 'react';
import "./assets/style.css";

function App() {
  const [newSaldo, setNewSaldo] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [expanses, setExpanses] = useState([]);
  const [isSortedDateAsc, setIsSortedDateAsc] = useState(true);
  const [isSortedAmountAsc, setIsSortedAmountAsc] = useState(true);
  const [inctotal, setInctotal] = useState(0);
  const [outtotal, setOuttotal] = useState(0);

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
      category: event.target.inkcat.value,
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
      "date": event.target.uitdate.value,
      "category": event.target.uitcat.value,
      "desc": event.target.uitdesc.value,
      "money": event.target.uitmoney.value
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
      <div className="container">
        <div className='date'>
          Maand: <select className="form-control bookMonth" defaultValue={new Date().getMonth()} name="bookMonth" style={{ marginRight: "15px" }}>
            <option value="1">Januari</option>
            <option value="2">Februari</option>
            <option value="3">Maart</option>
            <option value="4">April</option>
            <option value="5">Mei</option>
            <option value="6">Juni</option>
            <option value="7">Juli</option>
            <option value="8">Augustus</option>
            <option value="9">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          Boekjaar: <input className="form-control bookYear" type="text" name="bookYear" />
        </div>

        <div className="logo">
          <span>PM</span>Kasboek
        </div>
        
        

        <div className='currentsaldo'>
        <div className='row'>
          
            <div className='col-md-6'>
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
              <h3>Inkomsten</h3>

              <form method="POST" onSubmit={(event) => addIncome(event)}>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Datum</th>
                      <th>Categorie</th>
                      <th>Beschrijving</th>
                      <th>Bedrag</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input className='form-control' type='text' name='inkdate' id='inkdate' /></td>
                      <td><input className='form-control' type='text' name='inkcat' id='inccat' /></td>
                      <td><input className='form-control' type='text' name='inkdesc' id='inkdesc' /></td>
                      <td><input className='form-control' type='text' name='inkmoney' id='inkmoney' /></td>
                      <td><input className='form-control' type="submit" name="submit" value="Toevoegen" /></td>
                    </tr>
                  </tbody>
                </table>
              </form>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th onClick={() => { sortOnDate('incomes', incomes) }}>Datum</th>
                    <th>Categorie</th>
                    <th>Beschrijving</th>
                    <th onClick={() => { sortOnAmount('incomes', incomes) }}>Bedrag</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {incomes.map(item => {
                    return (
                      <tr>
                        <td>{item.date}</td>
                        <td>{item.category}</td>
                        <td>{item.desc}</td>
                        <td>{item.money}</td>
                        <td><button>Verwijderen</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <div className="incTotal">Totaal inkomsten: &euro; {inctotal}</div>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='uitgaven'>
              <h3>Uitgaven</h3>

              <form method="POST" onSubmit={(event) => addExpanse(event)}>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Datum</th>
                      <th>Categorie</th>
                      <th>Beschrijving</th>
                      <th>Bedrag</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input className='form-control' type='text' name='uitdate' id='uitdate' /></td>
                      <td><input className='form-control' type='text' name='uitcat' id='uitcat' /></td>
                      <td><input className='form-control' type='text' name='uitdesc' id='uitdesc' /></td>
                      <td><input className='form-control' type='text' name='uitmoney' id='uitmoney' /></td>
                      <td><input className='form-control' type="submit" name="submit" value="Toevoegen" /></td>
                    </tr>
                  </tbody>
                </table>
              </form>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th onClick={() => { sortOnDate('expanses', expanses) }}>Datum</th>
                    <th>Categorie</th>
                    <th>Beschrijving</th>
                    <th onClick={() => { sortOnAmount('expanses', expanses) }}>Bedrag</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {expanses.map(item => {
                    return (
                      <tr>
                        <td>{item.date}</td>
                        <td>{item.category}</td>
                        <td>{item.desc}</td>
                        <td>{item.money}</td>
                        <td><button>Verwijderen</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="outTotal">Totaal uitgaven: &euro; {outtotal}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
