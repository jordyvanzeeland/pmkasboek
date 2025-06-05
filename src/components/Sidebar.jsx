import React from "react";

const Sidebar = () => {
    return(
        <div className='sidebar noPrint'>
            <div className="logo">
                <span>PM</span>Kasboek
            </div>

            <ul className="sidebar-menu">
                <li><i className="fas fa-bars"></i> Overzicht</li>
                <li><i className="fas fa-plus"></i> Nieuw kasboek</li>
                <li><i className="fas fa-info-circle"></i> Help</li>
                <li><i className="fas fa-sign-out-alt"></i> Uitloggen</li>
            </ul>
        </div>
    )
}

export default Sidebar