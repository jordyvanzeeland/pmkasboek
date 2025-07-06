import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getCustomers } from '../../data/Admin';
import '../../assets/admin.css';
import withAuth from '../../components/withAuth';
import Header from '../../components/Header';
import { getUser } from "../../Functions";
import Forbidden from '../../components/Forbidden';

moment.locale('nl');

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [userIsAdmin, setUserIsAdmin] = useState(0);

    const getData = async () => {
        const user = await getUser();
        
        if(user.isAdmin === 1){
            setUserIsAdmin(user.isAdmin);
            
            try {
                const customers = await getCustomers();
                setCustomers(customers);
            } catch (error) {
                console.error("Error fetching user books:", error);
            }
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <React.Fragment>
            <Header isAdmin="true"/>
            <div className='content' style={{ marginLeft: 0 }}>

                <div className='row'>
                    <div className='col-md-12'>
                        {userIsAdmin === 1 ? (
                            <div className='card'>
                                <h3><i className="fa-solid fa-users"></i> Klantoverzicht</h3> 

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
                        ) : <Forbidden />}

                        
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default withAuth(Customers);