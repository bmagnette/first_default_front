import React from 'react';
import { Button, Modal, FormControl, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';


class InventaryModal extends  React.Component{

    onSubmit = () => {
        this.props.onSubmit();
        this.props.onHide();
    };

    onEdit = () => {
        this.props.editInventory();
        this.props.onHide();
    };

    render(){
        const { values } = this.props;
        console.log(values);
        let buttonToSubmit;
        if("Modifier" === this.props.buttonName){
            buttonToSubmit = <Button onClick={this.onEdit}>{this.props.buttonName}</Button>
        }
        else{
            buttonToSubmit = <Button onClick={this.onSubmit}>{this.props.buttonName}</Button>
        }

        console.log(this.props.values);
        return(
            <Modal
                show={this.props.modalShowInventory}
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
                            <Form.Label>Nom du meuble</Form.Label>
                            <Form.Control defaultValue={values.inventoryName} type="text" name="inventoryName" onChange={this.props.handleChange('inventoryName')} placeholder="Meuble télévision"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Quantité</Form.Label>
                            <Form.Control defaultValue={values.inventoryQuantity} type="text" name="inventoryQuantity" onChange={this.props.handleChange('inventoryQuantity')} placeholder="1"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Valeur du meuble</Form.Label>
                            <Form.Control defaultValue={values.inventoryValue} type="text" name="inventoryValue" onChange={this.props.handleChange('inventoryValue')} placeholder="50e"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Etat de conservation</Form.Label>
                            <Form.Control defaultValue={values.inventoryState} type="text" name="inventoryState" onChange={this.props.handleChange('inventoryState')} placeholder="Bon état, durable encore 5 ans"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date de l'achat</Form.Label>
                            <DatePicker selected={values.inventoryBought} onChange={this.props.handleChangeCalendar('inventoryBought')}/>
                            <Form.Control.Feedback/>
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

export default InventaryModal;