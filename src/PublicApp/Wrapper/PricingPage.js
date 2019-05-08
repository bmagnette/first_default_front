import React from 'react';
import Header from "../Components/Common/Header";
import Footer from "../Components/Common/Footer";
import paperplane from "../../public/img/paper-plane.png";
import plane from "../../public/img/plane.png";
import spaceShip from "../../public/img/space-ship.png";
import '../../public/css/PrivateApp/offers_saas.css';

class PricingPage extends React.Component{

    render(){
        return(
            <div>
                <Header isScrolling={false} isIndex={true} LogoRedirection="/"/>
                <div className="pricing_offer_wrapper">
                    <div className="background">
                        <div className="container">
                            <div className="panel pricing-table">
                                <div className="pricing-plan">
                                    <img src={paperplane} alt=""
                                         className="pricing-img"/>
                                    <h3 className="pricing-header">Inscrit</h3>
                                    <ul className="pricing-features">
                                        <li className="pricing-features-item">Test</li>
                                        <li className="pricing-features-item">Test</li>
                                        <li className="pricing-features-item">Test</li>
                                        <li className="pricing-features-item">Test</li>
                                    </ul>
                                    <span className="pricing-price">Gratuit</span>
                                    <a href="#/" className="pricing-button">S'inscrire</a>
                                </div>

                                <div className="pricing-plan">
                                    <img src={plane} alt=""
                                         className="pricing-img"/>
                                    <h3 className="pricing-header">Membre</h3>
                                    <ul className="pricing-features">
                                        <li className="pricing-features-item">Test</li>
                                        <li className="pricing-features-item">Test</li>
                                        <li className="pricing-features-item">Test</li>
                                        <li className="pricing-features-item">Test</li>
                                    </ul>
                                    <span className="pricing-price">9.99/mois</span>
                                    <a href="" className="pricing-button is-featured">1 mois offert</a>
                                </div>

                                <div className="pricing-plan">
                                    <img src={spaceShip} alt=""
                                         className="pricing-img"/>
                                    <h3 className="pricing-header">Pro</h3>
                                    <ul className="pricing-features">
                                        <li className="pricing-features-item">Test</li>
                                        <li className="pricing-features-item">Test</li>
                                        <li className="pricing-features-item">Test</li>
                                        <li className="pricing-features-item">Test</li>
                                    </ul>
                                    <span className="pricing-price">29.99/mois</span>
                                    <a href="" className="pricing-button">1 mois offert</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                < Footer/>
            </div>
        )
    }
}


export default PricingPage;