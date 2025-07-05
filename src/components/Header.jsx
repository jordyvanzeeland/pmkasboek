import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../Functions";

const Header = (props) => {
    const [currentUser, setCurrentUser] = useState([]);
    const [userIsAdmin, setUserIsAdmin] = useState(0);

    const getCurrentUser = async () => {
        const user = await getUser();
        setCurrentUser(user) 
    } 
    
    getCurrentUser();

    return(
        <React.Fragment>
            <div className='header'>
                <div className="header_right">
                    <ul>
                        <div className="user">{currentUser.name}</div>
                        <li><i className="fas fa-sign-out-alt"></i> Uitloggen</li>
                    </ul>
                </div>

                <div className="logo">
                    <span>PM</span>Kasboek
                </div>
            </div>

            <div className="menubar">
                <ul>
                    <NavLink to="/" exact="true"><li><i className="fa-solid fa-gauge-high"></i> Overzicht</li></NavLink>
                    {currentUser.isAdmin == 1 ? <NavLink to="/admin" exact="true"><li><i className="fa-solid fa-users"></i> Klanten</li></NavLink> : ""}
                </ul>
            </div>
        </React.Fragment>
    )
}

export default Header