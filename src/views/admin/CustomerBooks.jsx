import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getCustomerBooks, getCustomers } from '../../data/Admin';
import '../../assets/admin.css';
import withAuth from '../../components/withAuth';
import Header from '../../components/Header';

moment.locale('nl');

function CustomerBooks(props) {
    const [customerBooks, setCustomerBooks] = useState([]);

    useEffect(() => {
        const fetchUserBooks = async () => {
            try {
                const customers = await getCustomerBooks(props.router.customerid);
                setCustomerBooks(customers);
            } catch (error) {
                console.error("Error fetching user books:", error);
            }
        };
        fetchUserBooks();
    }, []);

    return (
        <React.Fragment>
            <Header />
            <div className='content' style={{ marginLeft: 0 }}>

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <h3><i className="fa-solid fa-users"></i> Klantoverzicht</h3> 
                            

                            <table id="DataTable" className="table table-hover display" width="100%">
                                <thead>
                                    <tr>
                                        <th>Boekjaar</th>
                                        <th>Beginsaldo</th>
                                    </tr>
                                </thead>
                                <tbody className="table-content">
                                    {customerBooks.map((book) => (
                                        <tr key={book.id}>
                                            <td style={{ cursor: 'pointer' }} onClick={() => window.location.href = `/admin/customer/${props.router.customerid}/book/${book.id}`} className='align-middle'>{book.bookyear}</td>
                                            <td className='align-middle'>{book.startsaldo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default withAuth(CustomerBooks);