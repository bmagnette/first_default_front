import React from 'react';
import { Button, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
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
                <form id="add_event_form">
                    <Modal.Body>
                        <FormGroup>
                            <ControlLabel>Nom du meuble</ControlLabel>
                            <FormControl defaultValue={values.inventoryName} type="text" name="inventoryName" onChange={this.props.handleChange('inventoryName')} placeholder="Meuble télévision"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Quantité</ControlLabel>
                            <FormControl defaultValue={values.inventoryQuantity} type="text" name="inventoryQuantity" onChange={this.props.handleChange('inventoryQuantity')} placeholder="1"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Valeur du meuble</ControlLabel>
                            <FormControl defaultValue={values.inventoryValue} type="text" name="inventoryValue" onChange={this.props.handleChange('inventoryValue')} placeholder="50e"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Etat de conservation</ControlLabel>
                            <FormControl defaultValue={values.inventoryState} type="text" name="inventoryState" onChange={this.props.handleChange('inventoryState')} placeholder="Bon état, durable encore 5 ans"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Date de l'achat</ControlLabel>
                            <DatePicker selected={values.inventoryBought} onChange={this.props.handleChangeCalendar('inventoryBought')}/>
                            <FormControl.Feedback/>
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

export default InventaryModal;