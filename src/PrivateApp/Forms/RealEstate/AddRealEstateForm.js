import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import NotificationSystem from "react-notification-system";
import SituationForm from "./SituationForm";
import RealEstateTypeForm from "./RealEstateTypeForm";
import FiscaliteForm from "./FiscaliteForm";
import DescriptionForm from "./DescriptionForm";
import PretBancaireForm from "./PretBancaireForm";
import TenantForm from "./TenantForm";
import { Button } from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import TypeRentForm from "./TypeRentForm";
import {BACK_URL} from "../../../constants";

class AddRealEstateForm extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.handleToogleChange = this.handleToogleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: '',
            value: "type_real_estate_form",

            situation_form: false,
            type_form: false,
            fiscalite_form: false,
            description_form: false,
            loan_form: false,
            tenant_form: false,
        };
    }

    nextStep = (nextStep) => {
        this.setState({
            value : nextStep
        });
    };

    _addNotification = (message, level) =>{
        this._notificationSystem.addNotification({
            message: message,
            level: level
        })};

    componentDidMount () {
        this._notificationSystem = this.refs.notificationSystem;
    };

    handleToogleChange(value) {
        this.setState({
            value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch(BACK_URL + 'real_estate/property', {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('TOKEN'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                "property_type": "apartment",
                "rent_type": "meuble",
                "ownBy": "personal",
                "tax": "microfoncier",

                "address": "6 rue bourgeoise",
                "zipCode": 95300,
                "cityName": "Hérouville en véxin",
                "surface": 20,
                "nb_room": 3,

                "amount": 100000,
                "notary": 8000,
                "agencyFees": 5000,
                "mobilier": 2000,
                "work": 300,

                "rent": 500,
                "landTax": 600,
                "teom": 500,
                "pnoInsurance": 300,
                "gliInsurance": 0,
                "coproFees": 400,

                "vacancyRate": 0.02,
                "maintenanceRate": 0.02,

                // Loan
                "loan_start_date": "22/05/2019",
                "loan_amount": 110000,
                "loan_duration": 15,
                "loan_insurance_rate": 2.05,
                "loan_capital_rate": 0.15,
                "loan_fees": 600,

                // Tenants
                "tenant_start_contract": "30/05/2019",
                "tenant_duration_contract": 36,
                "tenant_type_contract": "NOLOSO",
                "tenant_payment_date": 1,
                "tenant_first_name": "Baptiste",
                "tenant_last_name": "Magnette",
                "tenant_work": "Engineering",
                "tenant_mail": "baptiste.magnette@gmail.com",
                "tenant_mobile": "0769019848",
                "tenant_commentary": "Bon gars"
            })
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
        this.props.history.push("/immobilier");
        console.log("SUBMIT APART")
    };

    handleChangeOtherForm = input => {
        this.setState({ [input] : true});

        console.log(input);
        console.log(this.state);
    };

    render(){
        let currentForm;
        const { isNuClicked, isMeubleClicked } = this.state;
        const values = { isNuClicked, isMeubleClicked };

        if(this.state.value === "type_real_estate_form") {
            currentForm = <TypeRentForm nextStep={this.nextStep}/>;
        }
        else if(this.state.value === "situation_form") {
            currentForm = <SituationForm nextStep={this.nextStep} handleChangeOtherForm={this.handleChangeOtherForm} values={values}/>;
        }
        else if(this.state.value === "type_form"){
            currentForm = <RealEstateTypeForm nextStep={this.nextStep}/>
        }
        else if(this.state.value === "fiscalite_form"){
            currentForm = <FiscaliteForm nextStep={this.nextStep}/>
        }
        else if(this.state.value === "description_form"){
            currentForm = <DescriptionForm nextStep={this.nextStep}/>
        }
        else if(this.state.value === "loan_form"){
            currentForm = <PretBancaireForm nextStep={this.nextStep}/>
        }
        else if(this.state.value === "tenant_form"){
            currentForm = <div>
                <TenantForm nextStep={this.nextStep}/>
                <div className="situation_form_wrapper_button">
                    <Button type="submit">Enregistrer le bien</Button>
                </div>
            </div>
        }

        return(
            <div className="add_real_estate_form_wrapper">
                <div>
                    <NotificationSystem ref="notificationSystem" />
                </div>
                <h4>Ajouter un nouveau bien</h4>
                <div className="toogle_wrapper">
                    <ToggleButtonGroup  name="options" type="radio" defaultValue="situation_form" value={this.state.value} onChange={this.handleToogleChange}>
                        <ToggleButton value="type_real_estate_form">Type de bien</ToggleButton>
                        <ToggleButton value="situation_form">Type de location</ToggleButton>
                        <ToggleButton value="type_form">Détention</ToggleButton>
                        <ToggleButton value="fiscalite_form">Fiscalité</ToggleButton>
                        <ToggleButton value="description_form">Description</ToggleButton>
                        <ToggleButton value="loan_form">Prêt bancaire</ToggleButton>
                        <ToggleButton value="tenant_form">Locataire</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <form onSubmit={this.handleSubmit}>
                    {currentForm}
                </form>
            </div>
        )
    }
}

export default withRouter(AddRealEstateForm);