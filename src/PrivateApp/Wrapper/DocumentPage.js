import React from 'react';
import Nav from '../Components/Common/Nav';
import Header from '../Components/Common/Header';
import '../../public/css/PrivateApp/documentPage.css';


const DocumentPage = () => {
    return (
        <div id="app_container">
            <Header/>
            <div id="content_wrapper">
                <Nav/>
                <div className="content-right-wrapper">
                    <div className="section_title">
                        <h3>Vos documents</h3>
                    </div>
                    <div className="document_page_wrapper">
                        <div className="document_page_header">
                            <h4>Pour vous simplifier la vie, APPLICATION NAME vous mets à disposition des documents de gestions locatives vierges.</h4>
                            <p>Les documents en liaison avec vos locataires sont accessible directement sur leur page dédiée.</p>
                        </div>
                        <div className="document_page_list_wrapper">
                            <div>
                                <h5>Contrat de location</h5>
                                <ul>
                                    <li><a href="#">Contrat de location - Parking</a></li>
                                    <li><a href="#">Contrat de lcoation - Apartement</a></li>
                                    <li><a href="#">Contrat de location - Meublé</a></li>
                                </ul>
                            </div>
                            <div>
                                <h5>Préparation du dossier bancaire</h5>
                                <ul>
                                    <li><a href="#">Dossier complet</a></li>
                                    <li><a href="#">Importance du cash flow.</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default DocumentPage;