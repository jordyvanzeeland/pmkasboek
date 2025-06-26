import React, { useState, useEffect } from 'react';
import { debounce } from "lodash";
import { parseAmount, sortOnDate } from '../Functions';
import { updateUserAmount, insertUserAmount, deleteUserAmount } from '../data/Amounts';

const Amounts = ({ type, filteredAmounts, getData, bookid, admin}) => {
    const [amounts, setAmounts] = useState([]);

    const addAmount = async(event) => {
        event.preventDefault();
        const insertDate = event.target.amountdate.value;
        const insertDesc = event.target.amountdesc.value;
        const insertAmount = event.target.amountmoney.value;
        const parsedAmount = parseFloat(insertAmount.replace(",", ".")) || 0;
    
        await insertUserAmount(insertDate, insertDesc, parsedAmount, type, bookid);
    
        event.target.reset();
        await getData(bookid);
      }

    const updateRow = debounce(async (event, id) => {
        const updateDate = event.target.parentNode.parentNode.children[0].children[0].value;
        const updateDesc = event.target.parentNode.parentNode.children[1].children[0].value;
        const updateMoney = event.target.parentNode.parentNode.children[2].children[0].value;
        const parsedMoney = parseFloat(updateMoney.replace(",", ".")) || 0;
    
        await updateUserAmount(id, updateDate, updateDesc, parsedMoney, type);
        await getData(bookid);
    }, 500)

    const deleteAmount = async (id) => {
        await deleteUserAmount(id);
        await getData(bookid);
      }

    useEffect(() => {
        const sortedAmounts = sortOnDate(filteredAmounts, false);
        setAmounts(sortedAmounts);
    }, [filteredAmounts]);

    const filteredamountstotal = amounts.reduce((total, row) => total + parseAmount(row.amount), 0);

    return (
        <div className='amounts'>
            <h3>{ type==1 ? "Inkomsten" : "Uitgaven" } <span style={{ float: "right" }}>Totaal: &euro; {filteredamountstotal}</span></h3>

            <form method="POST" onSubmit={(event) => addAmount(event, 1)}>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Beschrijving</th>
                            <th>Bedrag</th>
                            {!admin && ( <th className="noPrint"></th> )}
                        </tr>
                    </thead>
                    <tbody>
                        {!admin && (<tr className="noPrint">
                            <td><input className='form-control' type='text' name='amountdate' id='amountdate' /></td>
                            <td><input className='form-control' type='text' name='amountdesc' id='amountdesc' /></td>
                            <td><input className='form-control' type='text' name='amountmoney' id='amountmoney' /></td>
                            <td><input className='form-control' type="submit" name="submit" value="Toevoegen" /></td>
                        </tr>)}

                        {amounts.map(item => {
                        return (
                            <React.Fragment>
                            {!admin && ( <tr key={item.id}>
                                <td><input id={`amountdate-${item.id}`} data-id={item.id} onChange={(event) => updateRow(event, item.id)} className='form-control' type='text' defaultValue={item.date} /></td>
                                <td><input id={`amountdesc-${item.id}`} data-id={item.id} onChange={(event) => updateRow(event, item.id)}  className='form-control' type='text' defaultValue={item.description}/></td>
                                <td><input id={`amountmoney-${item.id}`} data-id={item.id} onChange={(event) => updateRow(event, item.id)} className='form-control' type='text' defaultValue={item.amount}/></td>
                                <td><span className='form-control btn-delete noPrint' onClick={() => deleteAmount(item.id)}>Verwijderen</span></td>
                            </tr> )}

                            {admin && ( <tr key={item.id}>
                                <td><div id={`amountdate-${item.id}`}>{item.date}</div></td>
                                <td><div id={`amountdesc-${item.id}`}>{item.description}</div></td>
                                <td><div id={`amountmoney-${item.id}`}>{item.amount}</div></td>
                            </tr> )}
                            </React.Fragment>
                        )
                    })}
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default Amounts;