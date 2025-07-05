import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getCustomers } from '../../data/Admin';
import '../../assets/admin.css';
import withAuth from '../../components/withAuth';
import Header from '../../components/Header';

moment.locale('nl');

function Customers() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchUserBooks = async () => {
            try {
                const customers = await getCustomers();
                setCustomers(customers);
            } catch (error) {
                console.error("Error fetching user books:", error);
            }
        };
        fetchUserBooks();
    }, []);

    return (
        <React.Fragment>
            <Header isAdmin="true"/>
            <div className='content' style={{ marginLeft: 0 }}>

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <h3><i class="fa-solid fa-users"></i> Klantoverzicht</h3> 
                            

                            <table id="DataTable" className="table table-hover display" width="100%">
                                <thead>
                                    <tr>
                                        <th>Naam</th>
                                        <th>E-mailadres</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="table-content">
                                    {customers.map((customer) => (
                                        <tr key={customer.id}>
                                            <td style={{ cursor: 'pointer' }} onClick={() => window.location.href = `/admin/customer/${customer.id}`} className='align-middle'>{customer.name}</td>
                                            <td className='align-middle'>{customer.email}</td>
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
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default withAuth(Customers);