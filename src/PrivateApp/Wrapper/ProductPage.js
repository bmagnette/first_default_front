import React from 'react';
import Nav from '../Components/Common/Nav';
import Header from '../Components/Common/Header';
import '../../public/css/PrivateApp/card.css';

const ProductPage = () => {
    return (
        <div id="app_container">
            <Header/>
            <div id="content_wrapper">
                <Nav/>
                <div className="content-right-wrapper">
                    <div className="section_title">
                        <h3>Investissement Immobilier</h3>
                    </div>
                    <div className="cards_wrapper">
                        <div className="card_wrapper">
                            <div className="card_picture">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/blurred_bg.jpg" alt="Product"/>
                            </div>
                            <div className="card_header">
                                <h3>Forêt</h3>
                            </div>
                                <ul>
                                    <li>Profil</li>
                                    <li>Rendement</li>
                                    <li>Risque</li>
                                </ul>
                            <div>

                            </div>
                        </div>
                        <div className="card_wrapper">
                            <div className="card_picture">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/blurred_bg.jpg" alt="Product"/>
                            </div>
                            <div className="card_header">
                                <h3>Forêt</h3>
                            </div>
                            <ul>
                                <li>Profil</li>
                                <li>Rendement</li>
                                <li>Risque</li>
                            </ul>
                            <div>

                            </div>
                        </div>
                        <div className="card_wrapper">
                            <div className="card_picture">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/blurred_bg.jpg" alt="Product"/>
                            </div>
                            <div className="card_header">
                                <h3>Forêt</h3>
                            </div>
                            <ul>
                                <li>Profil</li>
                                <li>Rendement</li>
                                <li>Risque</li>
                            </ul>
                            <div>

                            </div>
                        </div>
                        <div className="card_wrapper">
                            <div className="card_picture">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/blurred_bg.jpg" alt="Product"/>
                            </div>
                            <div className="card_header">
                                <h3>Forêt</h3>
                            </div>
                            <ul>
                                <li>Profil</li>
                                <li>Rendement</li>
                                <li>Risque</li>
                            </ul>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    )
};

export default ProductPage;