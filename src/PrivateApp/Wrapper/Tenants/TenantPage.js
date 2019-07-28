import React from 'react';
import Nav from '../../Components/Common/Nav';
import Header from '../../Components/Common/Header';
import '../../../public/css/PrivateApp/card.css';
import TenantTable from "../../Tables/TenantTable";
import TenantStreamer from "./TenantStreamer";
import { Button } from "react-bootstrap";
import TenantModal from "./TenantPropertyModal";
import {BACK_URL} from "../../../constants";

class TenantPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            tenantStartContract: new Date(),
            tenantDurationContract: '',
            tenantTypeContract: '',
            tenantPaymentDate: '',
            tenantFirstName: '',
            tenantLastName: '',
            tenantWork: '',
            tenantSalary: '',
            tenantMail: '',
            tenantMobile: '',
            tenantCommentary: '',
            isGarant: false,
            garantFirstName: '',
            garantLastName: '',
            garantLink: '',
            garantSalary: '',
            garantWork: '',
            allTenants: [],
            modalShow: false,
            eventClicked: 0,
            eventInfo: {},
        }
    }

    handleChange = input => event => {
        this.setState({[input]: event.target.value});
    };

    handleChangeCalendar = input => (event_date) => {
        this.setState({[input]: event_date});
    };

    handleChangeCheckBox = (event) => {
        this.setState({isGarant: event.target.checked});
    };

    handleSubmit = (event) => {
        event.preventDefault();

        let body = JSON.stringify({
            tenantDurationContract: this.state.tenantDurationContract,
            tenantTypeContract: this.state.tenantTypeContract,
            tenantPaymentDate: this.state.tenantPaymentDate,
            tenantFirstName: this.state.tenantFirstName,
            tenantLastName: this.state.tenantLastName,
            tenantWork: this.state.tenantWork,
            tenantMail: this.state.tenantMail,
            tenantMobile: this.state.tenantMobile,
            tenantCommentary: this.state.tenantCommentary,
            isGarant: this.state.isGarant,
            garantFirstName: this.state.garantFirstName,
            garantLastName: this.state.garantLastName,
            garantLink: this.state.garantLink,
            garantSalary: this.state.garantSalary,
            garantWork: this.state.garantWork
        });

        fetch(BACK_URL + 'real_estate/property', {
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem('TOKEN'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: body
        })
            .catch(error => {
                this._addNotification(error["message"], "error")
            })
            .then(function (response) {
                return response.json();
            })
            .then(response => {
                this._addNotification(response["message"], "success");
            });
    };

    render(){
        let modalClose = () => this.setState({modalShow: false, eventClickedTenant: 0, eventInfoTenant: {}, tenantStartContract: new Date(),
            tenantDurationContract: '',
            tenantTypeContract: '',
            tenantPaymentDate: '',
            tenantFirstName: '',
            tenantLastName: '',
            tenantWork: '',
            tenantMail: '',
            tenantMobile: '',
            tenantCommentary: '',
            isGarant: false,
            garantFirstName: '',
            garantLastName: '',
            garantLink: '',
            garantSalary: '',
            garantWork: ''});

        let modalOpen = () => this.setState({modalShow: true});

        const {tenantStartContract, tenantDurationContract, tenantTypeContract, tenantPaymentDate, tenantFirstName, tenantLastName,
            tenantWork, tenantMail, tenantMobile, tenantCommentary, allTenants, eventClickedTenant, modalShowTenant, eventInfoTenant,
            tenantSalary, isGarant, garantFirstName, garantLastName, garantLink, garantSalary, garantWork} = this.state;

        const valuesTenants = {tenantStartContract, tenantDurationContract, tenantTypeContract, tenantPaymentDate,
            tenantFirstName, tenantLastName, tenantWork, tenantMail, tenantMobile, tenantCommentary, allTenants,
            eventClickedTenant, modalShowTenant, eventInfoTenant, tenantSalary, isGarant, garantFirstName, garantLastName,
            garantLink, garantSalary, garantWork};

        return (
            <div id="app_container">
                <Header/>
                <div id="content_wrapper">
                    <Nav/>
                    <TenantModal title={"Ajouter un locataire"} buttonName={"Ajouter"} show={this.state.modalShow} onSubmit={this.handleSubmit} onHide={modalClose} unHide={modalOpen} values={valuesTenants} handleChangeCheckBox={this.handleChangeCheckBox} handleChange={this.handleChange} handleChangeCalendar={this.handleChangeCalendar}/>
                    <div className="content-right-wrapper">
                        <TenantStreamer/>
                        <div>
                            <Button onClick={modalOpen}>Ajouter un locataire</Button>
                        </div>
                        <TenantTable/>
                    </div>
                </div>
            </div>
        )
    }
}

export default TenantPage;