import React from 'react';
import '../../../public/css/PrivateApp/card.css';
import { Button, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import LoanModal from "./LoanModal";


class LoanForm extends React.Component {

    saveAndContinue = () => {
        this.props.nextStep("tenant_form", "loan_form_complete");
    };

    validatePartForm = () => {
        this.saveAndContinue();
    };

    unValidateForm = () => {
        this.props.prevStep("inventary_form", "loan_form_complete")
    };

    render() {
        const { values } = this.props;
        let valueList = <div></div>;

        let self = this; // save object reference
        if(values.allLoan.length === 0){
            valueList = <div className="emptyListObject">Il n'y a aucun prêt associer à ce bien.</div>
        }
        else{
            valueList = <div className="object_to_add_wrapper">
                {values.allLoan.map(function(listValue) {
                    return <div className="object_to_add">Prêt {listValue["loanType"]}: {listValue["loanAmount"]} - {listValue["loanRate"]} - {listValue["loanDuration"]} ans
                        <span className="glyphicon_cursor" onClick={() =>  self.props.removeLoan(listValue["id"])}><i className="glyphicon glyphicon-trash"></i></span>
                        <span className="glyphicon_cursor" onClick={() => self.props.showEditLoan(listValue)}><i className="glyphicon glyphicon-edit"></i></span>
                    </div>;
                })}
            </div>
        }

        let conditionalModal = <div></div>
        if(this.props.values.eventClicked === 1){
            conditionalModal = <LoanModal title={"Modifier un prêt"} buttonName={"Modifier"} show={values.modalShow} onHide={this.props.onHide} onSubmit={this.props.onSubmit} editLoan={this.props.editLoan} values={this.props.values.eventInfo} handleChange={this.props.handleChange} handleChangeCalendar={this.props.handleChangeCalendar} />
        }
        else{
            conditionalModal = <LoanModal title={"Ajouter un prêt"} buttonName={"Ajouter"} show={values.modalShow} onHide={this.props.onHide} onSubmit={this.props.onSubmit} editLoan={this.props.editLoan} values={values} handleChange={this.props.handleChange} handleChangeCalendar={this.props.handleChangeCalendar} />
        }

        return (
            <div className="add_apartment_wrapper">
                <Button onClick={this.props.unHide}>Associer un prêt bancaire</Button>
                {conditionalModal}
                <div className="object_list_wrapper">
                    <div className="add_object_apartment_header">
                        <h4>Prêts associer à ce bien</h4>
                    </div>
                    <div>
                        {valueList}
                    </div>
                </div>
                <div className="situation_form_wrapper_button">
                    <Button onClick={this.unValidateForm}>Précédent</Button>
                    <Button onClick={this.validatePartForm}>Suivant</Button>
                </div>
            </div>
        )
    }
}


export default LoanForm;