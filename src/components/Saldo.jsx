import React, { useRef } from 'react';
import { debounce } from "lodash";
import { updateUserSaldos } from '../data/Saldos';

const Saldo = ({ currentActiveMonth, currentBook, setBeginSaldo, monthlySaldo, selectedMonth, admin }) => {
    const monthTotal = monthlySaldo[selectedMonth - 1]?.toFixed(2).replace(".", ",");
    const totalNegative = document.querySelector(".totalNegative");
    const currentBookYear = useRef();
    const currentStartSaldo = useRef();

    const updateBook = debounce(async() => {
        try {
          await updateUserSaldos(currentBook.id, currentBookYear.current.value, currentStartSaldo.current.value)
        } catch (error) {
            console.error("Error fetching user amounts:", error);
        }
      }, 500);

    if (totalNegative) {
        const isNegative = parseFloat(monthTotal) < 0;
        totalNegative.style.display = isNegative ? "block" : "none";
    }

    return (
        <div className='currentsaldo'>
            <div className='row'>
                <div className='nameOverview showPrint'>Overzicht {currentActiveMonth}</div>
          
                <div className='col-md-6'>
                    {!admin && (
                        <React.Fragment>
                            Boekjaar: <input ref={currentBookYear} className="form-control bookYear" type="text" name="bookYear" defaultValue={currentBook.bookyear} onChange={() => updateBook()} />
                            Beginsaldo: <input ref={currentStartSaldo} className='form-control beginSaldo' type="text" name="beginSaldo" defaultValue={currentBook.startsaldo} onChange={() => updateBook()} />
                        </React.Fragment>
                    )}

                    {admin && (
                        <React.Fragment>
                            Boekjaar: <div className="bookYear" type="text" name="bookYear" style={{ width: 'fit-content', fontWeight: 400, marginLeft: '5px' }}>{currentBook.bookyear}</div>
                            Beginsaldo: <div className='beginSaldo' type="text" name="beginSaldo" style={{ width: 'fit-content', fontWeight: 400, marginLeft: '5px' }}>{currentBook.startsaldo}</div>
                        </React.Fragment>
                    )}
                    
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