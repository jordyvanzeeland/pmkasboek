import React from 'react';

const Saldo = ({ currentActiveMonth, currentBook, setBeginSaldo, monthlySaldo, selectedMonth }) => {
    const monthTotal = monthlySaldo[selectedMonth - 1]?.toFixed(2).replace(".", ",");
    const totalNegative = document.querySelector(".totalNegative");

    if (totalNegative) {
        const isNegative = parseFloat(monthTotal) < 0;
        totalNegative.style.display = isNegative ? "block" : "none";
    }

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
                    <div className='saldo'>Totaal saldo: <span className="amountsTotal" style={{ color: parseFloat(monthTotal) < 0 ? "darkred" : "#000000" }}>&euro; {monthTotal}</span></div>
                    <div className="totalNegative noPrint">LET OP! Het totaal saldo is nu negatief.</div>
                </div>
            </div>
        </div>
    );
};

export default Saldo;