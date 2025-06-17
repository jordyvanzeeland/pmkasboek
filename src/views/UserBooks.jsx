import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getUserSaldos, insertUserSaldos } from '../data/Saldos';
import '../assets/style.css';
import withAuth from '../components/withAuth';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

moment.locale('nl');

function UserBooks() {
    const [userbooks, setUserbooks] = useState([]);
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const newBook = async () => {
        try {
            await insertUserSaldos(currentYear);
            navigate(`/kasboek/${currentYear}`);
        } catch (error) {
            console.error("Error creating user books:", error);
        }
    }

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
        <React.Fragment>
            <Sidebar />
            <div className='content'>
            <button onClick={() => newBook() } className='btn btn-red'>Nieuw kasboek</button>
            <h3 style={{ marginTop: '30px' }}>Gebruiker kasboeken</h3>
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
                                <button className="delete-book">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </React.Fragment>
    );
}

export default withAuth(UserBooks);