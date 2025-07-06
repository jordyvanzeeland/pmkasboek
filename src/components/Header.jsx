import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUser } from "../Functions";

const Header = (props) => {
    const [currentUser, setCurrentUser] = useState([]);
    const navigate = useNavigate();

    const getCurrentUser = async () => {
        const user = await getUser();
        setCurrentUser(user) 
    } 

    const logout = () => {
        localStorage.clear();
        navigate("/")
    }

    useEffect(() => {
        getCurrentUser();
    }, [])

    return(
        <React.Fragment>
            <div className='header'>
                <div className="header_right">
                    <ul>
                        <li className="user">{currentUser.name}</li>
                        <li><button onClick={() => logout()} className="btn btn-logout"><i className="fas fa-sign-out-alt"></i> Uitloggen</button></li>
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