import React from 'react';
import Nav from '../Components/Common/Nav';
import Header from '../Components/Common/Header';
import '../../public/css/PrivateApp/card.css';


const DocumentPage = () => {
    return (
        <div id="app_container">
            <Header/>
            <div id="content_wrapper">
                <Nav/>
                <div className="content-right-wrapper">
                    <div className="section_title">
                        <h3>Investissement Immobilier</h3>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default DocumentPage;