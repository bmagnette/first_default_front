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
        const user = JSON.parse(localStorage.getItem('USER'));

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
            properties: user["properties"],
            dropdownValue: {},
            modalShow: false,
            eventClicked: 0,
            eventInfo: {},
        }
    }

    handleChange = input => event => {
        this.setState({[input]: event.target.value});
    };

    handleSelection = (event) => {
        this.setState({dropdownValue: {value: event.value, label: event.label}});
    };

    handleChangeCalendar = input => (event_date) => {
        this.setState({[input]: event_date});
    };

    handleChangeCheckBox = (event) => {
        this.setState({isGarant: event.target.checked});
    };

    handleSubmit = () => {

        let body = JSON.stringify({
            tenantStartContract: this.state.tenantStartContract,
            tenantDurationContract: this.state.tenantDurationContract,
            tenantTypeContract: this.state.tenantTypeContract,
            tenantPaymentDate: this.state.tenantPaymentDate,
            tenantFirstName: this.state.tenantFirstName,
            tenantLastName: this.state.tenantLastName,
            tenantWork: this.state.tenantWork,
            tenantSalary: this.state.tenantSalary,
            tenantMail: this.state.tenantMail,
            tenantMobile: this.state.tenantMobile,
            tenantCommentary: this.state.tenantCommentary,
            isGarant: this.state.isGarant,
            garantFirstName: this.state.garantFirstName,
            garantLastName: this.state.garantLastName,
            garantLink: this.state.garantLink,
            garantSalary: this.state.garantSalary,
            garantWork: this.state.garantWork,
            propertyID: this.state.dropdownValue["value"],
        });

        fetch(BACK_URL + 'tenant/create', {
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
            garantWork: '',
            tenantSalary: '',
            dropdownValue: {}});

        let modalOpen = () => this.setState({modalShow: true});

        const {tenantStartContract, tenantDurationContract, tenantTypeContract, tenantPaymentDate, tenantFirstName, tenantLastName,
            tenantWork, tenantMail, tenantMobile, tenantCommentary, allTenants, eventClickedTenant, modalShowTenant, eventInfoTenant,
            tenantSalary, isGarant, garantFirstName, garantLastName, garantLink, garantSalary, garantWork, dropdownValue, properties} = this.state;

        const valuesTenants = {dropdownValue, tenantStartContract, tenantDurationContract, tenantTypeContract, tenantPaymentDate,
            tenantFirstName, tenantLastName, tenantWork, tenantMail, tenantMobile, tenantCommentary, allTenants,
            eventClickedTenant, modalShowTenant, eventInfoTenant, tenantSalary, isGarant, garantFirstName, garantLastName,
            garantLink, garantSalary, garantWork, properties};

        return (
            <div id="app_container">
                <Header/>
                <div id="content_wrapper">
                    <Nav/>
                    <TenantModal title={"Ajouter un locataire"} buttonName={"Ajouter"} handleSelection={this.handleSelection} show={this.state.modalShow} onSubmit={this.handleSubmit} onHide={modalClose} unHide={modalOpen} values={valuesTenants} handleChangeCheckBox={this.handleChangeCheckBox} handleChange={this.handleChange} handleChangeCalendar={this.handleChangeCalendar}/>
                    <div className="content-right-wrapper">
                        <TenantStreamer/>
                        <div className="real_estate_button_header">
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