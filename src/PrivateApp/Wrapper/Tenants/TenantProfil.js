import React from 'react';
import Nav from '../../Components/Common/Nav';
import Header from '../../Components/Common/Header';
import '../../../public/css/PrivateApp/tenant.css';
import {Button} from "react-bootstrap";
import TenantPaymentTable from "../../Tables/TenantPaymentTable";
import {Link} from "react-router-dom";

const TenantProfil = () => {

    // Pick ID of tenant and display all payment + all information
    return (
        <div id="app_container">
            <Header/>
            <div id="content_wrapper">
                <Nav/>
                <div className="content-right-wrapper">
                    <div className="real_estate_view_header">
                        <div>
                            <Link to="/locataire" className="btn btn-default">
                                <i className="glyphicon glyphicon-chevron-left"></i>
                                Retour à la liste de locataires
                            </Link>
                        </div>
                        <div>
                            <Button>Modifier les informations</Button>
                        </div>
                    </div>

                    <div className="tenant_information_wrapper">
                        <div className="tenant_contact_information_wrapper">
                            <div className="tenant_contact_details_wrapper">
                                <div className="tenant_information_header">
                                    <h4>Contact</h4>
                                </div>
                                <div className="tenant_contact_content">
                                    <h5>Locataire</h5>
                                    <ul>
                                        <li>Téléphone : </li>
                                        <li>Email : </li>
                                    </ul>
                                </div>
                                <hr/>
                                <div className="tenant_contact_content">
                                    <h5>Garant</h5>
                                    <ul>
                                        <li>Téléphone : </li>
                                        <li>Email : </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="descriptif_document_wrapper">
                                <div className="descriptif_document_header">
                                    <h4>Documents</h4>
                                </div>
                                <table className="descriptif_document_wrapper_table">
                                    <thead>
                                    <tr>
                                        <th>Nom du document</th>
                                        <th>Fichier</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Contrat de location</td>
                                        <td><Link to="#"><span><i className="glyphicon glyphicon-download"></i></span></Link></td>
                                    </tr>
                                    <tr>
                                        <td>Avis d'échéance</td>
                                        <td><Link to="#"><span><i className="glyphicon glyphicon-download"></i></span></Link></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="tenant_details_wrapper_wrapper">
                            <div className="tenant_details_wrapper">
                                <div className="streamer_header">
                                </div>
                                <div className="tenant_details_content">
                                    <h4>Clara.S : Ma locataire préférée</h4>
                                    <div className="tenant_details_list_wrapper">
                                        <div>
                                        <ul>
                                            <li>Nom</li>
                                            <li>Prénom</li>
                                            <li>Métier</li>
                                            <li>Statut</li>
                                            <li>Salaire</li>
                                        </ul>
                                        </div>
                                        <div>
                                            <ul>
                                                <li>Début du contrat</li>
                                                <li>Durée du contrat</li>
                                                <li>Type de contrat</li>
                                                <li>Date de payement</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <ul>
                                                <li>S'il y a un garant 3 ème colonne.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p>Commentaires : </p>
                                </div>
                            </div>
                            <div className="tenant_table_wrapper">
                                <h4>Liste des payements a effectué par le locataire</h4>
                                <TenantPaymentTable/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TenantProfil;