import React from 'react';
import { Link } from 'react-router-dom';
import '../../../public/css/PrivateApp/Nav.css'

const SettingsNav = () => {
    return (
        <div className="account_settings_nav_wrapper">
            <h3>Paramètres du compte</h3>
            <ul className="account_settings_nav">
                <li><Link to="/profil">Profil d'investisseur</Link></li>
                <li><Link to="/information">Informations de compte</Link></li>
                <li><Link to="/invoice">Services et Factures</Link></li>
            </ul>
        </div>
    )
};

export default SettingsNav