import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import NotificationSystem from "react-notification-system";
import RentingTypeForm from "./RentingTypeForm";
import IsOwnByForm from "./isOwnByForm";
import PersonalNuTaxForm from "./TaxForms/PersonalNuTaxForm";
import PersonalMeubleTaxForm from "./TaxForms/PersonalMeubleTaxForm";

import DescriptionForm from "./DescriptionForm";
import LoanForm from "./LoanForm";
import TenantForm from "./TenantForm";
import {withRouter} from "react-router-dom";
import BuildingTypeForm from "./BuildingTypeForm";
import {BACK_URL} from "../../../constants";
import InventaryForm from "./InventaryForm";

class MainForm extends React.Component{


    constructor(props, context) {
        super(props, context);

        const {dataToModify} = this.props;

        this.state = {
            modifyValue: dataToModify,
            toogleValue: "type_real_estate_form",

            // Building Type
            building_type: '',

            // Renting type
            renting_type: '',
            own_by: '',
            tax: '',

            // Description
            address_number: '',
            address_extensions: '',
            address : '',
            zip_code: '',
            city_name: '',
            surface: '',
            nb_room: '',

            value: '',
            notary_fees: '',
            agency_fees: '',
            mobilier: '',
            work: '',

            rent_HC: '',
            charge_rent: '',
            charge_fonciere: '',
            teom: '',
            pno_insurance: '',
            gli_insurance: '',
            copro_fees: '',

            vacancy_rate: '',
            maintenance_rate: '',

            allLoan: [],
            allTenants: [],
            allInventory: [],
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

            loanType: 'amortissable',
            loanAmount: '',
            loanDuration: 15,
            loanInsuranceRate: '',
            loanCapitalRate: '',
            loanStartDate: new Date(),
            loanPaymentDate: 1,
            loanFees: '',

            inventoryName: '',
            inventoryQuantity: '',
            inventoryValue: '',
            inventoryBought: new Date(),
        }
    }

    nextStep = (nextStep, activeComplete) => {
        this.setState({
            toogleValue : nextStep,
        });
    };

    prevStep = (prevStep, activeComplete) => {
        this.setState({
            toogleValue : prevStep,
        });
    };

    _addNotification = (message, level) =>{
        this._notificationSystem.addNotification({
            message: message,
            level: level
        })};

    componentDidMount () {
        this._notificationSystem = this.refs.notificationSystem;

        if(this.state.modifyValue !== undefined) {
            let data = this.state.modifyValue;
            let mappingToogleBuilding = {"apartment": "isApartment", "house": "isHouse", "garage": "isGarage"};
            let buildingType = mappingToogleBuilding[data["type"]];

            let mappingToogleTax = {"realregime": "isRegimeReel"};
            let taxType = mappingToogleTax[data["tax"]];

            this.setState({
                toogleValue: "type_real_estate_form",

                // Building Type
                [buildingType]: true,
                [data["rent_type"]]: true, // Nu ou meuble
                [data["own_by"]]: true,
                [taxType]: true,

                own_by: data["own_by"],
                building_type: data["type"],
                renting_type: data["rent_type"],
                tax: data["tax"],

                // Description
                address_number: data["address_number"],
                address_extensions: data["address_extension"],
                address: data["address"],
                zip_code: data["zipcode"],
                city_name: data["city_name"],
                surface: data["surface"],
                nb_room: data["nb_room"],

                value: data["value"],
                notary_fees: data["notary_fees"],
                agency_fees: data["agency_fees"],
                mobilier: data["mobilier"],
                work: data["work"],

                rent_HC: data["rent_HC"],
                charge_rent: data["charge_rent"],
                charge_fonciere: data["charge_fonciere"],
                teom: data["teom"],
                pno_insurance: data["pno_insurance"],
                gli_insurance: data["gli_insurance"],
                copro_fees: data["copro_fees"],

                vacancy_rate: data["vacancy_rate"],
                maintenance_rate: data["maintenance_rate"],

                // Loans
                allLoan: data["mortgages"],
                loanType: 'amortissable',
                loanAmount: '',
                loanDuration: 15,
                loanInsuranceRate: '',
                loanCapitalRate: '',
                loanStartDate: new Date(),
                loanPaymentDate: 1,
                loanFees: '',

                // Tenants
                allTenants: data["tenants"],
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

                allInventory: data["inventory"],
                inventoryName: '',
                inventoryQuantity: '',
                inventoryValue: '',
                modalShowInventory: false,
                eventClickedInventory: 0,
                eventInfoInventory: {},
                inventoryBought: new Date(),
                inventoryState: '',

                modalShow: false,
                eventClicked: 0,
                eventInfo: {},

                modalShowTenant: false,
                eventClickedTenant: 0,
                eventInfoTenant: {}
            })
        }
    };

    handleToogleButton = (toogleValue) => {
        this.setState({toogleValue})
    };

    handleToogleBuildingType = input => event => {
        this.setState({isApartment: false, isBuilding: false, isHouse: false, isGarage: false});
        this.setState({[input]: true, building_type: input});
    };

    handleToogleRentingType = input => event => {
        this.setState({isNu: false, isMeuble: false, isHouse: false, isResidence: false});
        this.setState({[input]: true, renting_type: input});
    };

    handleToogleTaxType = input => event => {
        this.setState({tax: false, isLMNP: false, isLMP: false, isMicroFoncier: false, isMicroBic: false, isRegimeReal: false, isSimplifiedReel: false, isNormalReel: false});
        this.setState({[input]: true, tax: input});
    };

    handleToogleOwnType = input => event => {
        this.setState({isOwnByPersonal: false, isOwnByCompany: false});
        this.setState({[input]: true, own_by: input});
    };

    handleChange = input => event => {
        this.setState({[input]: event.target.value});
    };

    handleChangeCalendar = input => (event_date) => {
        this.setState({[input]: event_date});
    };

    // LOAN PART

    editLoan = () => {
        let self = this.state;
        let allLoan = self.allLoan;

        const allLoanTemp = allLoan.slice();

        for(let myIndex in allLoan) {
            if(allLoan[myIndex]["id"] === self.eventInfo["id"]){
                allLoanTemp.splice(myIndex, 1);
                let data = {"loanType": this.state.loanType, "loanStartDate": this.state.loanStartDate, "loanAmount": this.state.loanAmount,
                    "loanDuration" : this.state.loanDuration, "loanInsuranceRate" : this.state.loanInsuranceRate, "loanCapitalRate" :this.state.loanCapitalRate,
                    "loanPaymentDate" : this.state.loanPaymentDate, "loanFees" : this.state.loanFees, "loanRate": this.state.loanRate, "id": new Date().toISOString()};
                allLoanTemp.push(data);
            }
        this.setState({allLoan: allLoanTemp});
    }};

    editInventory = () => {
        let self = this.state;
        let allInventary = self.allInventory;
        const allInventaryTemp = allInventary.slice();

        for (let myIndex in allInventary) {
            if (allInventary[myIndex]["id"] === self.eventInfoInventory["id"]) {
                allInventaryTemp.splice(myIndex, 1);
                let data = {
                    "inventoryName": this.state.inventoryName, "inventoryQuantity": this.state.inventoryQuantity,
                    "inventoryValue": this.state.inventoryValue, "inventoryBought": this.state.inventoryBought,
                    "id": new Date().toISOString(), "inventoryState": this.state.inventoryState,
                };
                console.log(data);
                allInventaryTemp.push(data);
            }
            this.setState({allInventory: allInventaryTemp});
        }
    };

    removeInventory = input_id => {
        let allInventary = this.state.allInventory;
        const allInventaryTemp = allInventary.slice();

        for(let myIndex in allInventary) {
            if (allInventary[myIndex]["id"] === input_id) {
                allInventaryTemp.splice(myIndex, 1);
            }
        }
        this.setState({allInventory : allInventaryTemp})
    };

    addInventory = input => {
        let allInventary = this.state.allInventory;
        allInventary.push(input);
        this.setState({allInventory: allInventary});
    };

    removeLoan = input_id => {
        let allLoan = this.state.allLoan;
        const allLoanTemp = allLoan.slice();

        for(let myIndex in allLoan) {
            if (allLoan[myIndex]["id"] === input_id) {
                allLoanTemp.splice(myIndex, 1);
            }
        }
        this.setState({allLoan : allLoanTemp})
    };

    addLoan = input => {
        let allLoan = this.state.allLoan;
        allLoan.push(input);
        this.setState({allLoan: allLoan});
    };

    // Tenant Part
    addTenant = input => {
        let allTenant = this.state.allTenants;
        allTenant.push(input);

        this.setState({allTenants: allTenant})
    };

    editTenant = () => {
        let self = this.state;
        let allTenants = self.allTenants;

        const allTenantsTemp = allTenants.slice();

        for(let myIndex in allTenants) {
            if(allTenants[myIndex]["id"] === self.eventInfoTenant["id"]){
                allTenantsTemp.splice(myIndex, 1);
                let data = {"tenantStartContract": this.state.tenantStartContract, "tenantDurationContract": this.state.tenantDurationContract,
                    "tenantTypeContract": this.state.tenantTypeContract, "tenantPaymentDate" : this.state.tenantPaymentDate,
                    "tenantFirstName" : this.state.tenantFirstName, "tenantLastName" :this.state.tenantLastName, "tenantSalary": this.state.tenantSalary,
                    "tenantWork" : this.state.tenantWork, "tenantMail" : this.state.tenantMail, "tenantMobile": this.state.tenantMobile,
                    "tenantCommentary": this.state.tenantCommentary, "id": new Date().toISOString(), "isGarant": this.state.isGarant,
                    "garantFirstName": this.state.garantFirstName, "garantLastName":  this.state.garantLastName, "garantLink": this.state.garantLink,
                    "garantSalary":  this.state.garantSalary, "garantWork":  this.state.garantWork};
                allTenantsTemp.push(data);
            }
            this.setState({allTenants: allTenantsTemp});
        }};

    removeTenant = input_id => {
        let allTenants = this.state.allTenants;
        const allTenantsTemp = allTenants.slice();

        for(let myIndex in allTenants) {
            if (allTenants[myIndex]["id"] === input_id) {
                allTenantsTemp.splice(myIndex, 1);
            }
        }
        this.setState({allTenants : allTenantsTemp})
    };

    generateDivSaved = () => {
        let rate = parseFloat(this.state.loanInsuranceRate) + parseFloat(this.state.loanCapitalRate);
        this.addLoan({"loanType": this.state.loanType, "loanStartDate": this.state.loanStartDate, "loanAmount": this.state.loanAmount,
            "loanDuration" : this.state.loanDuration, "loanInsuranceRate" : this.state.loanInsuranceRate, "loanCapitalRate" : this.state.loanCapitalRate,
            "loanPaymentDate" : this.state.loanPaymentDate, "loanFees" : this.state.loanFees, "loanRate": rate, "id": new Date().toISOString()});

        this.setState({
            modalShow: false,
            loanType: 'amortissable',
            loanAmount: '',
            loanDuration: 15,
            loanInsuranceRate: '',
            loanCapitalRate: '',
            loanStartDate: new Date(),
            loanPaymentDate: 1,
            loanFees: '',});
    };

    generateDivInventory = () => {
        this.addInventory({"inventoryName": this.state.inventoryName, "inventoryQuantity": this.state.inventoryQuantity,
            "inventoryValue": this.state.inventoryValue, "inventoryBought": this.state.inventoryBought,
            "id": new Date().toISOString(), "inventoryState": this.state.inventoryState});

        this.setState({
            inventoryName: '',
            inventoryQuantity: '',
            inventoryValue: '',
            modalShowInventory: false,
            eventClickedInventory: 0,
            eventInfoInventory: {},
            inventoryBought: new Date(),
            inventoryState: ''});
    };

    handleChangeCheckBox = (event) => {
        this.setState({isGarant: event.target.checked});
    };

    generateDivSavedTenants = () => {
        this.addTenant({"tenantStartContract": this.state.tenantStartContract, "tenantDurationContract": this.state.tenantDurationContract,
            "tenantTypeContract" : this.state.tenantTypeContract, "tenantPaymentDate": this.state.tenantPaymentDate,
            "tenantFirstName" : this.state.tenantFirstName, "tenantLastName": this.state.tenantLastName,
            "tenantWork" : this.state.tenantWork, "tenantMail": this.state.tenantMail, "tenantSalary": this.state.tenantSalary,
            "tenantMobile" : this.state.tenantMobile, "tenantCommentary": this.state.tenantCommentary, "id": new Date().toISOString(),
            "isGarant": this.state.isGarant, "garantFirstName": this.state.garantFirstName, "garantLastName":  this.state.garantLastName,
            "garantLink": this.state.garantLink, "garantSalary":  this.state.garantSalary, "garantWork":  this.state.garantWork});
        this.setState({
            modalShowTenant: false,
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
            garantWork: '',});
    };

    handleSubmit = (event) => {
        event.preventDefault();

        let body = JSON.stringify({
            // General
            "property_type":  this.state.building_type,
            "rent_type":  this.state.renting_type,
            "own_by":  this.state.own_by,
            "tax":  this.state.tax,

            // Description du bien.
            "address_number": this.state.address_number,
            "address_extensions": this.state.address_extensions,
            "address": this.state.address,
            "zip_code":  this.state.zip_code,
            "city_name":  this.state.city_name,
            "surface":  this.state.surface,
            "nb_room":  this.state.nb_room,

            "value": this.state.value,
            "notary_fees": this.state.notary_fees,
            "agency_fees": this.state.agency_fees,
            "mobilier": this.state.mobilier,
            "work": this.state.work,

            // Operationnel
            "rent_HC": this.state.rent_HC,
            "charge_rent": this.state.charge_rent,
            "charge_fonciere": this.state.charge_fonciere,
            "teom": this.state.teom,
            "pno_insurance": this.state.pno_insurance,
            "gli_insurance": this.state.gli_insurance,
            "copro_fees": this.state.copro_fees,

            // Details
            "vacancy_rate": this.state.vacancy_rate,
            "maintenance_rate": this.state.maintenance_rate,

            // List elements.
            "mortgages": this.state.allLoan,
            "inventory": this.state.allInventory,
            "tenants": this.state.allTenants,
        });

        let requestType = "";
        let putID = "";
        if(this.state.modifyValue !== undefined) {
            requestType = "PUT";
            putID = "/" + this.state.modifyValue["id"]
        }
        else{
            requestType = "POST"
        }
            fetch(BACK_URL + 'real_estate/property' + putID, {
            method: requestType,
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
        this.props.history.push("/immobilier");
    };

    render(){
        let currentForm;

        // Inventory
        const {allInventory, inventoryState, inventoryBought, inventoryName, inventoryQuantity, inventoryValue, modalShowInventory, eventClickedInventory, eventInfoInventory} = this.state;
        const valuesInventory = {allInventory, inventoryState, inventoryBought, inventoryName, inventoryQuantity, inventoryValue, modalShowInventory, eventClickedInventory, eventInfoInventory};

        // Loan
        const { loanAmount, loanDuration, loanInsuranceRate, loanCapitalRate, loanStartDate, loanFees, loanType, loanPaymentDate, allLoan, eventClicked, modalShow, eventInfo } = this.state;
        const valuesMortgage = { loanAmount, loanDuration, loanInsuranceRate, loanCapitalRate, loanStartDate, loanFees, loanType, loanPaymentDate, allLoan, eventClicked, modalShow, eventInfo };

        const {tenantStartContract, tenantDurationContract, tenantTypeContract, tenantPaymentDate, tenantFirstName, tenantLastName,
            tenantWork, tenantMail, tenantMobile, tenantCommentary, allTenants, eventClickedTenant, modalShowTenant, eventInfoTenant,
            tenantSalary, isGarant, garantFirstName, garantLastName, garantLink, garantSalary, garantWork} = this.state;

        const valuesTenants = {tenantStartContract, tenantDurationContract, tenantTypeContract, tenantPaymentDate,
            tenantFirstName, tenantLastName, tenantWork, tenantMail, tenantMobile, tenantCommentary, allTenants,
            eventClickedTenant, modalShowTenant, eventInfoTenant, tenantSalary, isGarant, garantFirstName, garantLastName,
            garantLink, garantSalary, garantWork };

        // Description
        const {surface, nb_room, address_number, address_extensions, address, zip_code, city_name, value, notary_fees, agency_fees, mobilier, work, rent_HC, charge_rent, charge_fonciere, teom, pno_insurance, gli_insurance, copro_fees, vacancy_rate, maintenance_rate, building_type} = this.state;
        const valuesDescription = {surface, nb_room, address_number, address_extensions, address, zip_code, city_name, value, notary_fees, agency_fees, mobilier, work, rent_HC, charge_rent, charge_fonciere, teom, pno_insurance, gli_insurance, copro_fees, vacancy_rate, maintenance_rate, building_type};

        // Building type
        const {isApartment, isHouse, isBuilding, isGarage} = this.state;
        const valuesBuildingType = {isApartment, isHouse, isBuilding, isGarage};

        // Renting type
        const {isNu, isMeuble, isResidence} = this.state;
        const valuesRentingType = {isNu, isMeuble, isResidence};

        // Own type
        const {isOwnByPersonal, isOwnByCompany} = this.state;
        const valuesOwnType = {isOwnByPersonal, isOwnByCompany};

        // Tax system
        const {tax, isLMNP, isLMP, isMicroFoncier, isMicroBic, isRegimeReel, isSimplifiedReel, isNormalReel} = this.state;
        const valuesTax = { tax, isLMNP, isLMP, isMicroFoncier, isMicroBic, isRegimeReel, isSimplifiedReel, isNormalReel};

        if(this.state.toogleValue === "type_real_estate_form") {
            currentForm = <BuildingTypeForm nextStep={this.nextStep} handleChange = {this.handleToogleBuildingType} values={valuesBuildingType}/>;
        }
        else if(this.state.toogleValue === "situation_form") {
            currentForm = <RentingTypeForm prevStep={this.prevStep} nextStep={this.nextStep} handleChange = {this.handleToogleRentingType} values={valuesRentingType}/>;
        }
        else if(this.state.toogleValue === "type_form"){

            if(this.state.isResidence === true){
                this.setState({toogleValue: "description_form"});
            }
            currentForm = <IsOwnByForm prevStep={this.prevStep} nextStep={this.nextStep} handleChange = {this.handleToogleOwnType} values={valuesOwnType}/>
        }
        else if(this.state.toogleValue === "fiscalite_form"){

            if(this.state.own_by === "isOwnByPersonal" && this.state.isNu === true){
                currentForm = <PersonalNuTaxForm prevStep={this.prevStep} nextStep={this.nextStep} handleChange = {this.handleToogleTaxType} values={valuesTax}/>
            }
            if(this.state.own_by === "isOwnByPersonal" && this.state.isMeuble === true){
                currentForm = <PersonalMeubleTaxForm prevStep={this.prevStep} nextStep={this.nextStep} handleChange = {this.handleToogleTaxType} values={valuesTax}/>
            }
            if(this.state.own_by === "isOwnByCompany"){
                currentForm = <div className="add_apartment_wrapper">Pas encore pris en compte</div>
            }
        }
        else if(this.state.toogleValue === "description_form"){
            currentForm = <DescriptionForm prevStep={this.prevStep} nextStep={this.nextStep} handleChange={this.handleChange} values={valuesDescription}/>
        }
        else if(this.state.toogleValue === "inventary_form"){
            let modalClose = () => this.setState({inventoryName: '', inventoryBought: new Date(), inventoryState: '', inventoryQuantity: '', inventoryValue: '', modalShowInventory: false, eventClickedInventory: 0, eventInfoInventory: {}});
            let modalOpen = () => this.setState({modalShowInventory: true});
            let showEditInventory = (clicked_loan_info) => this.setState({modalShowInventory: true, eventClickedInventory : 1, eventInfoInventory: clicked_loan_info});

            currentForm = <InventaryForm prevStep={this.prevStep} nextStep={this.nextStep} values={valuesInventory} onHide={modalClose} unHide={modalOpen}
                                         onSubmit={this.generateDivInventory} handleChange={this.handleChange} removeInventory={this.removeInventory}
                                         showEditInventory={showEditInventory} editInventory={this.editInventory} handleChangeCalendar={this.handleChangeCalendar}/>
        }
        else if(this.state.toogleValue === "loan_form"){
            let modalClose = () => this.setState({modalShow: false, eventClicked: 0, eventInfo: {},                 loanType: 'amortissable',
                loanAmount: '',
                loanDuration: 15,
                loanInsuranceRate: '',
                loanCapitalRate: '',
                loanStartDate: new Date(),
                loanPaymentDate: 1,
                loanFees: '',});
            let modalOpen = () => this.setState({modalShow: true});
            let showEditLoan = (clicked_loan_info) => this.setState({modalShow: true, eventClicked : 1, eventInfo: clicked_loan_info});

            currentForm = <LoanForm prevStep={this.prevStep} nextStep={this.nextStep} onHide={modalClose} unHide={modalOpen} onSubmit={this.generateDivSaved} handleChange={this.handleChange}
                                    handleChangeCalendar={this.handleChangeCalendar} values={valuesMortgage} removeLoan={this.removeLoan} showEditLoan={showEditLoan} editLoan={this.editLoan}/>
        }
        else if(this.state.toogleValue === "tenant_form"){
            let modalClose = () => this.setState({modalShowTenant: false, eventClickedTenant: 0, eventInfoTenant: {}, tenantStartContract: new Date(),
                tenantDurationContract: '',
                tenantTypeContract: '',
                tenantPaymentDate: '',
                tenantFirstName: '',
                tenantLastName: '',
                tenantWork: '',
                tenantMail: '',
                tenantMobile: '',
                tenantCommentary: ''});

            let showEditTenant = (clicked_tenant_info) => this.setState({modalShowTenant: true, eventClickedTenant : 1, eventInfoTenant: clicked_tenant_info});
            let modalOpen = () => this.setState({modalShowTenant: true});
            currentForm = <TenantForm prevStep={this.prevStep} nextStep={this.nextStep} onHide={modalClose} unHide={modalOpen} onSubmit={this.generateDivSavedTenants}  handleChange={this.handleChange}
                                      handleChangeCalendar={this.handleChangeCalendar} values={valuesTenants} removeTenant={this.removeTenant} showEditTenant={showEditTenant} editTenant={this.editTenant} handleChangeCheckBox={this.handleChangeCheckBox}/>
        }

        return(
            <div className="add_real_estate_form_wrapper">
                <div>
                    <NotificationSystem ref="notificationSystem" />
                </div>
                {this.props.title}

                <div className="toogle_wrapper">
                    <ToggleButtonGroup name="options" type="radio" defaultValue="situation_form" value={this.state.toogleValue} onChange={this.handleToogleButton}>
                        <ToggleButton disabled value="type_real_estate_form">Type de bien</ToggleButton>
                        <ToggleButton disabled value="situation_form">Type de location</ToggleButton>
                        <ToggleButton disabled value="type_form">Détention</ToggleButton>
                        <ToggleButton disabled value="fiscalite_form">Fiscalité</ToggleButton>
                        <ToggleButton disabled value="description_form">Description</ToggleButton>
                        <ToggleButton disabled value="inventary_form">Inventaire</ToggleButton>
                        <ToggleButton disabled value="loan_form">Prêts bancaires</ToggleButton>
                        <ToggleButton disabled value="tenant_form">Locataires</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <form onSubmit={this.handleSubmit}>
                    {currentForm}
                </form>
            </div>
        )
    }
}

export default withRouter(MainForm);