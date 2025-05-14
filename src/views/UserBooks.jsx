import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getUserSaldos } from '../data/Saldos';
import '../assets/style.css';
import withAuth from '../components/withAuth';

moment.locale('nl');

function UserBooks() {
    const [userbooks, setUserbooks] = useState([]);

    useEffect(() => {
        const fetchUserBooks = async () => {
            try {
                const saldos = await getUserSaldos();
                setUserbooks(saldos);
            } catch (error) {
                console.error("Error fetching user books:", error);
            }
        };
        fetchUserBooks();
    }, []);

    return (
        <div>
            <h1>Gebruiker kasboeken</h1>
            <table id="DataTable" className="display" width="100%">
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
                            <td>{book.bookyear}</td>
                            <td>{book.startsaldo}</td>
                            <td>
                                <button className="delete-book">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default withAuth(UserBooks);