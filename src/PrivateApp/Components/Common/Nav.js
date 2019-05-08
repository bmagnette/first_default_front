import React from 'react';
import { Link } from 'react-router-dom';
import '../../../public/css/PrivateApp/Nav.css'

const Nav = () => {
    return (
        <div id="sidebar_wrapper">
            <div className="main_nav_wrapper">
                <div id="main_nav">
                    <div className="main_nav_group">
                        <hr className="nav_separator"/>
                        <ul>
                            <Link to="/dashboard">
                                <li>
                                        <span className="glyphicon glyphicon-signal"></span>
                                         Tableau de bord
                                </li>
                            </Link>
                            <Link to="/dashboard">
                            <li>
                                    <span className="glyphicon glyphicon-cog"></span>
                                    Gestion d'entités
                            </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Nav