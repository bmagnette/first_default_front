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
                            <Link to="/immobilier">
                                <li>
                                    <span className="glyphicon glyphicon-signal"></span>
                                    Vos biens
                                </li>
                            </Link>
                            <Link to="/simulation">
                                <li>
                                    <span className="glyphicon glyphicon-signal"></span>
                                    Simulation
                                </li>
                            </Link>
                            <Link to="/calendar">
                                <li>
                                    <span className="glyphicon glyphicon-signal"></span>
                                    Calendrier
                                </li>
                            </Link>
                            {/*<Link to="/produits">
                            <li>
                                    <span className="glyphicon glyphicon-cog"></span>
                                    Produits
                            </li>
                            </Link>*/}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Nav