import React from 'react';

const Saldo = ({ currentActiveMonth, currentBook, setBeginSaldo, monthlySaldo, selectedMonth }) => {
    return (
        <div className='currentsaldo'>
            <div className='row'>
                <div className='nameOverview showPrint'>Overzicht {currentActiveMonth}</div>
          
                <div className='col-md-6'>
                    Boekjaar: <input className="form-control bookYear" type="text" name="bookYear" defaultValue={currentBook.bookyear} />
                    Beginsaldo: <input className='form-control beginSaldo' type="text" name="beginSaldo" defaultValue={currentBook.startsaldo} onChange={(e) => setBeginSaldo(parseFloat(e.target.value.replace(",", ".")))} />
                    <button className='btn btn-red noPrint' style={{ float: 'none' }} onClick={() => window.print()}>Afdrukken</button>
                </div>

                <div className='col-md-6'>
                    <div className='saldo'>Totaal saldo: <span>&euro; {monthlySaldo[selectedMonth - 1]?.toFixed(2).replace(".", ",")}</span></div>
                </div>
            </div>
        </div>
    );
};

export default Saldo;