import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { deleteUserSaldos, getUserSaldos, insertUserSaldos } from '../data/Saldos';
import { getUserAmounts } from '../data/Amounts';
import '../assets/style.css';
import withAuth from '../components/withAuth';
import { useNavigate } from 'react-router-dom';
import { getUser } from "../Functions";
import Header from '../components/Header';

moment.locale('nl');

function UserBooks() {
    const [currentUser, setCurrentUser] = useState([]);
    const [userbooks, setUserbooks] = useState([]);
    const [userTransactions, setUserTransactions] = useState([]);
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const newBook = async () => {
        try {
            const data = await insertUserSaldos(currentYear);
            navigate(`/kasboek/${data.newbook.id}`);
        } catch (error) {
            console.error("Error creating user books:", error);
        }
    }

    const deleteBook = async (bookid) => {
        try {
            await deleteUserSaldos(bookid);
            await getData();
        } catch (error) {
            console.error("Error deleting user books:", error);
        }
    }

    const getData = async () => {
        const user = await getUser();
        setCurrentUser(user) 

        try {
            const transactions = await getUserAmounts(5, 'id', 'desc');
            setUserTransactions(transactions);

            const saldos = await getUserSaldos();
            setUserbooks(saldos.books);
        } catch (error) {
            console.error("Error fetching user books:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <React.Fragment>
            <Header />
            <div className='content' style={{ marginLeft: 0 }}>
            <h3 style={{ marginTop: '30px' }}>Kasboeken overzicht {currentUser.name}</h3>

            <div className='row'>
                <div className='col-md-5'>
                    <div className='card'>
                        <button onClick={() => newBook() } className='btn btn-red btn-new'>Nieuw kasboek</button>
                        <h3><i className="fa-solid fa-book-open"></i> Kasboeken:</h3> 
                        

                        <table id="DataTable" className="table table-hover display" width="100%">
                            <thead>
                                <tr>
                                    <th>Boekjaar</th>
                                    <th>Beginsaldo</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="table-content">
                                {userbooks.map((book) => (
                                    <tr key={book.id}>
                                        <td style={{ cursor: 'pointer' }} onClick={() => window.location.href = `/kasboek/${book.id}`} className='align-middle'>{book.bookyear}</td>
                                        <td className='align-middle'>&euro; {book.startsaldo}</td>
                                        <td>
                                            <button onClick={() => deleteBook(book.id)}className="delete-book">
                                                <i className="fa-solid fa-trash-can" style={{fontSize: '13px'}} ></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                    </div>
                </div>
                <div className='col-md-7'>
                    <div className='card'>
                        <h3><i className="fa-solid fa-coins"></i> Laatste transacties</h3>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Boekjaar</th>
                                    <th>Datum</th>
                                    <th>Beschrijving</th>
                                    <th>Bedrag</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userTransactions ? userTransactions.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.saldo.bookyear}</td>
                                        <td>{item.date}</td>
                                        <td>{item.description}</td>
                                        <td>{item.amount}</td>
                                    </tr>
                                )
                            }) : ''}
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
            

            
            </div>
        </React.Fragment>
    );
}

export default withAuth(UserBooks);