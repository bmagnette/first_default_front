import React from 'react';
import {Button, Modal, FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import DatePicker from 'react-datepicker';

class FlowModal extends React.Component {

    render() {

        const { values } = this.props;
        return (
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered="true"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>
                    <form id="add_event_form">
                        <Modal.Body>
                            <FormGroup controlId="formValidationSuccess1">
                                <ControlLabel>Nom</ControlLabel>
                                <FormControl defaultValue={values.nameExpense} required type="text" name="nameExpense" onChange={this.props.handleChange}/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess1">
                                <ControlLabel>Montant</ControlLabel>
                                <FormControl defaultValue={values.amountExpense} required type="text" name="amountExpense" onChange={this.props.handleChange}/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess1">
                                <ControlLabel>Date</ControlLabel>
                                <DatePicker selected={values.dateExpense} onChange={this.props.handleChangeCalendar}/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess1">
                                <ControlLabel>Commentaires</ControlLabel>
                                <FormControl defaultValue={values.commentaryExpense} type="textarea" name="commentaryExpense" onChange={this.props.handleChange}/>
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.props.onHide} variant="primary">Fermer</Button>
                            <Button id="submit_modal" type="submit" size="sm" onClick={this.props.handleSubmit}>{this.props.buttonTitle}</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default FlowModal;