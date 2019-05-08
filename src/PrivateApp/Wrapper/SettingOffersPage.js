import React from 'react';
import Header from "../Components/Common/Header";
import SettingsNav from "../Components/Common/SettingsNav";
import '../../public/css/PrivateApp/offers_saas.css';
import {Button} from "react-bootstrap";
import {BACK_URL, USER_TYPE} from "../../constants";
import InvoiceTable from "../InvoiceTable";
import spaceShip from "../../public/img/space-ship.png";
import plane from "../../public/img/plane.png";
import paperplane from "../../public/img/paper-plane.png";

class SettingOffersPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirectToNewPage:false,
            redirectUrl: ''};
    }

    handleClick(amount, role, duration){
        fetch(BACK_URL + 'v1/payments', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem('TOKEN')},
            body: JSON.stringify({
                "amount": amount,
                "role": role,
                "duration": duration
            })})
            .catch(error => {
                console.log(error["message"]);
            })
            .then(function(response) { return response.json(); })
            .then(response => {
                localStorage.setItem('payment_ID', response["data"]["payment_id"]);
                this.setState({
                    redirectToNewPage: true,
                    redirectUrl: response["data"]["payment_return_url"]});
            });
    };

    handlePayment(){
        let payment_id = localStorage.getItem('payment_ID');
        fetch(BACK_URL + 'v1/payments/'+ parseInt(payment_id, 10), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem('TOKEN')},
            })
            .catch(error => {
                this._addNotification(error["error"], "error");
            })
            .then(function(response) { return response.json(); })
            .then(response => {
                this._addNotification(response["data"], "success");
    })};

    render(){
        const redirect_url = this.state.redirectUrl;

        if(this.state.redirectToNewPage){
            return(
                window.location.href = redirect_url
            )
        }
        console.log("Props", this.props);
        if(this.props.paymentCheck){
            this.handlePayment()
        }
        return(
            <div id="app_container">
                <Header hamburger={false}/>
                <div className="account_edit_page_wrapper">
                    <SettingsNav/>
                    <div className="account_offers_wrapper">
                        <div className="background">
                            <div className="container">
                                <div className="panel pricing-table">

                                    <div className="pricing-plan">
                                        <img src={paperplane} alt=""
                                             className="pricing-img"/>
                                            <h3 className="pricing-header">Inscrit</h3>
                                            <ul className="pricing-features">
                                                <li className="pricing-features-item">Custom domains</li>
                                                <li className="pricing-features-item">Sleeps after 30 mins of
                                                    inactivity</li>
                                                <li className="pricing-features-item">Test</li>
                                                <li className="pricing-features-item">Test</li>
                                            </ul>
                                            <span className="pricing-price">Gratuit</span>
                                            <Button className="pricing-button">Actuel</Button>
                                    </div>

                                    <div className="pricing-plan">
                                        <img src={plane} alt=""
                                             className="pricing-img"/>
                                            <h3 className="pricing-header">Basique</h3>
                                            <ul className="pricing-features">
                                                <li className="pricing-features-item">Never sleeps</li>
                                                <li className="pricing-features-item">Multiple workers for more</li>
                                                <li className="pricing-features-item">Test</li>
                                                <li className="pricing-features-item">Test</li>
                                            </ul>
                                            <span className="pricing-price">9.99/mois</span>
                                            <Button className="pricing-button is-featured" onClick={ () => this.handleClick(999, USER_TYPE[1], 31) }>Free trial</Button>
                                    </div>

                                    <div className="pricing-plan">
                                        <img src={spaceShip} alt=""
                                             className="pricing-img"/>
                                            <h3 className="pricing-header">Pro</h3>
                                            <ul className="pricing-features">
                                                <li className="pricing-features-item">Dedicated</li>
                                                <li className="pricing-features-item">Simple horizontal scalability</li>
                                                <li className="pricing-features-item">Test</li>
                                                <li className="pricing-features-item">Test</li>
                                            </ul>
                                            <span className="pricing-price">29.99/mois</span>
                                            <Button className="pricing-button" onClick={ () => this.handleClick(2999, USER_TYPE[2], 31) }>Free trial</Button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <InvoiceTable/>
                    </div>
                </div>
            </div>
        )
    }
}

export default SettingOffersPage;