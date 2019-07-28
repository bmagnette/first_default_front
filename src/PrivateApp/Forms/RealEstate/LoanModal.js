import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
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
            <Form id="add_event_form">
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Montant du prêt</Form.Label>
                        <Form.Control defaultValue={values.loanAmount} type="text" name="loan_amount" onChange={this.props.handleChange('loanAmount')} placeholder="Montant emprunté"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Type du prêt</Form.Label>
                        <select defaultValue={values.loanType} onChange={this.props.handleChange('loanType')} placeholder="Type de prêt">
                            <option value="amortissable" name="amortissable">Amortissable</option>
                            <option value="inFine" name="infine">InFine</option>
                        </select>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Durée du prêt</Form.Label>
                        <select defaultValue={values.loanDuration} onChange={this.props.handleChange('loanDuration')} placeholder="Durée du prêt en années">
                            {yearLoan.map(function(listValue){
                                return listValue;
                            })}
                        </select>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Date de payement</Form.Label>
                        <select defaultValue={values.loanPaymentDate} onChange={this.props.handleChange('loanPaymentDate')} placeholder="Durée du prêt en années">
                            {dayInMonth.map(function(listValue){
                                return listValue;
                            })}
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Taux du prêt</Form.Label>
                        <Form.Control defaultValue={values.loanCapitalRate} type="text" name="capital_rate" onChange={this.props.handleChange('loanCapitalRate')} placeholder="Taux du crédit, Exemple : 2.1%"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Taux de l'assurance</Form.Label>
                        <Form.Control defaultValue={values.loanInsuranceRate} type="text" name="insurance_rate" onChange={this.props.handleChange('loanInsuranceRate')} placeholder="Taux de l'assurance, Exemple : 0.21%"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <DatePicker selected={values.loanStartDate} onChange={this.props.handleChangeCalendar('loanStartDate')}/>
                        <Form.Control.Feedback/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Frais de dossiers</Form.Label>
                        <Form.Control defaultValue={values.loanFees} type="text" name="loan_fees" onChange={this.props.handleChange('loanFees')} placeholder="Frais bancaires faisant suite au prêt"/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <div className="add_object_button_wrapper">
                        <Button onClick={this.props.onHide}>Annuler</Button>
                        {buttonToSubmit}
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>)
    }
}

export default LoanModal;