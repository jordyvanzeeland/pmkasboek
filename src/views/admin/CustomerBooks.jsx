import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getCustomerBooks } from '../../data/Admin';
import '../../assets/admin.css';
import withAuth from '../../components/withAuth';
import Header from '../../components/Header';
import { getUser } from "../../Functions";
import Forbidden from '../../components/Forbidden';
import Loader from '../../components/Loader';

moment.locale('nl');

function CustomerBooks(props) {
    const [customerBooks, setCustomerBooks] = useState([]);
    const [noAccess, setNoAccess] = useState(false);
    const [userIsAdmin, setUserIsAdmin] = useState(0);
    const [showLoader, setShowLoader] = useState(false);

    const getData = async () => {
        setShowLoader(true);
        const user = await getUser();
        
        if(user.isAdmin === 1){
            setUserIsAdmin(user.isAdmin);
            
            try {
                const customers = await getCustomerBooks(props.router.customerid);
                setCustomerBooks(customers);
            } catch (error) {
                console.error("Error fetching user books:", error);
            }
        }else{
            setNoAccess(true);
        }

        setShowLoader(false);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <React.Fragment>
            <Header isAdmin="true"/>
            {showLoader && (<Loader />)}

            <div className='content' style={{ marginLeft: 0 }}>
                <div className='row'>
                    <div className='col-md-12'>
                        {noAccess && (<Forbidden />)}

                        {!noAccess && userIsAdmin === 1 && (
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
                                                <td className='align-middle'>&euro; {book.startsaldo}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default withAuth(CustomerBooks);