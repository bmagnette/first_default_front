import React from 'react';
import { Button, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';


class LoanModal extends  React.Component{

    onSubmit = () => {
        this.props.onSubmit();
        this.props.onHide();
    };

    onEdit = () => {
        this.props.editLoan();
        this.props.onHide();
    };

    render(){
        const { values } = this.props;

        let yearLoan = [];
        let dayInMonth = [];

        for (let i=2; i < 32; i++) {
            yearLoan.push(<option key={"option_" + i} value={i} name={"option_" + i}>{i}</option>)
        }

        for (let i=1; i <= 31; i++) {
            dayInMonth.push(<option key={"option_" + i} value={i} name={"option_" + i}>{i}</option>)
        }

        let buttonToSubmit;
        if("Modifier" === this.props.buttonName){
            buttonToSubmit = <Button onClick={this.onEdit}>{this.props.buttonName}</Button>
        }
        else{
            buttonToSubmit = <Button onClick={this.onSubmit}>{this.props.buttonName}</Button>
        }
        return(
        <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered="true">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {this.props.title}
                </Modal.Title>
            </Modal.Header>
            <form id="add_event_form">
                <Modal.Body>
                    <FormGroup>
                        <ControlLabel>Montant du prêt</ControlLabel>
                        <FormControl defaultValue={values.loanAmount} type="text" name="loan_amount" onChange={this.props.handleChange('loanAmount')} placeholder="Montant emprunté"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Type du prêt</ControlLabel>
                        <select defaultValue={values.loanType} onChange={this.props.handleChange('loanType')} placeholder="Type de prêt">
                            <option value="amortissable" name="amortissable">Amortissable</option>
                            <option value="inFine" name="infine">InFine</option>
                        </select>
                    </FormGroup>
                    <FormGroup controlId="exampleForm.ControlSelect1">
                        <ControlLabel>Durée du prêt</ControlLabel>
                        <select defaultValue={values.loanDuration} onChange={this.props.handleChange('loanDuration')} placeholder="Durée du prêt en années">
                            {yearLoan.map(function(listValue){
                                return listValue;
                            })}
                        </select>
                    </FormGroup>
                    <FormGroup controlId="exampleForm.ControlSelect1">
                        <ControlLabel>Date de payement</ControlLabel>
                        <select defaultValue={values.loanPaymentDate} onChange={this.props.handleChange('loanPaymentDate')} placeholder="Durée du prêt en années">
                            {dayInMonth.map(function(listValue){
                                return listValue;
                            })}
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Taux du prêt</ControlLabel>
                        <FormControl defaultValue={values.loanCapitalRate} type="text" name="capital_rate" onChange={this.props.handleChange('loanCapitalRate')} placeholder="Taux du crédit, Exemple : 2.1%"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Taux de l'assurance</ControlLabel>
                        <FormControl defaultValue={values.loanInsuranceRate} type="text" name="insurance_rate" onChange={this.props.handleChange('loanInsuranceRate')} placeholder="Taux de l'assurance, Exemple : 0.21%"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Date</ControlLabel>
                        <DatePicker selected={values.loanStartDate} onChange={this.props.handleChangeCalendar('loanStartDate')}/>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Frais de dossiers</ControlLabel>
                        <FormControl defaultValue={values.loanFees} type="text" name="loan_fees" onChange={this.props.handleChange('loanFees')} placeholder="Frais bancaires faisant suite au prêt"/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <div className="add_object_button_wrapper">
                        <Button onClick={this.props.onHide}>Annuler</Button>
                        {buttonToSubmit}
                    </div>
                </Modal.Footer>
            </form>
        </Modal>)
    }
}

export default LoanModal;