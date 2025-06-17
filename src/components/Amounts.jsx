import React, { useState, useEffect } from 'react';
import { parseAmount } from '../Functions';

const Amounts = ({ type, addAmount, filteredAmounts, updateRow, deleteAmount }) => {
    const [isSortedDateAsc, setIsSortedDateAsc] = useState(false);
    const [amounts, setAmounts] = useState([]);

    const sortOnDate = () => {
        let sortedList = [...amounts].sort((a, b) => {
          return isSortedDateAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
        }).reverse();
    
        setIsSortedDateAsc(!isSortedDateAsc);
        setAmounts(sortedList);
    }

    useEffect(() => {
        setAmounts(filteredAmounts);
    }, [filteredAmounts]);

    const filteredamountstotal = amounts.reduce((total, row) => total + parseAmount(row.amount), 0);

    return (
        <div className='amounts'>
            <h3>{ type=='incomes' ? "Inkomsten" : "Uitgaven" } <span style={{ float: "right" }}>Totaal: &euro; {filteredamountstotal}</span></h3>

            <form method="POST" onSubmit={(event) => addAmount(event, 1)}>
                <table className='table'>
                    <thead>
                        <tr>
                            <th onClick={() => { sortOnDate() }}>Datum</th>
                            <th>Beschrijving</th>
                            <th>Bedrag</th>
                            <th className="noPrint"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="noPrint">
                            <td><input className='form-control' type='text' name='amountdate' id='amountdate' /></td>
                            <td><input className='form-control' type='text' name='amountdesc' id='amountdesc' /></td>
                            <td><input className='form-control' type='text' name='amountmoney' id='amountmoney' /></td>
                            <td><input className='form-control' type="submit" name="submit" value="Toevoegen" /></td>
                        </tr>
                        {amounts.map(item => {
                        return (
                            <tr key={item.id}>
                                <td><input id={`amountdate-${item.id}`} data-id={item.id} onChange={(event) => updateRow(event, 1, item.id)} className='form-control' type='text' defaultValue={item.date}/></td>
                                <td><input id={`amountdesc-${item.id}`} data-id={item.id} onChange={(event) => updateRow(event, 1, item.id)}  className='form-control' type='text' defaultValue={item.description}/></td>
                                <td><input id={`amountmoney-${item.id}`} data-id={item.id} onChange={(event) => updateRow(event, 1, item.id)} className='form-control' type='text' defaultValue={item.amount}/></td>
                                <td><span className='form-control btn-delete noPrint' onClick={() => deleteAmount(type, item.id)}>Verwijderen</span></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default Amounts;