import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return(
        <React.Fragment>
            <div className='header'>
                <div className="header_right">
                    <ul>
                        <li><i className="fas fa-plus"></i> Nieuw kasboek</li>
                        <li><i className="fas fa-sign-out-alt"></i> Uitloggen</li>
                    </ul>
                </div>

                <div className="logo">
                    <span>PM</span>Kasboek
                </div>
            </div>

            <div className="menubar">
                <ul>
                    <NavLink to="/" exact="true"><li><i class="fa-solid fa-gauge-high"></i> Overzicht</li></NavLink>
                    <NavLink to="/kasboek" exact="true"><li><i class="fa-solid fa-book"></i> Kasboeken</li></NavLink>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default Header