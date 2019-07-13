import React from 'react';
import { Button, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';


class TenantModal extends  React.Component{

    onSubmit = () => {
        this.props.onSubmit();
        this.props.onHide();
    };

    onEdit = () => {
        this.props.editTenant();
        this.props.onHide();
    };

    render(){
        const { values } = this.props;

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
                        <div>
                        <FormGroup>
                            <ControlLabel>Début du contrat</ControlLabel>
                            <DatePicker selected={values.tenantStartContract} onChange={this.props.handleChangeCalendar('tenantStartContract')}/>
                            <FormControl.Feedback/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Durée du bail</ControlLabel>
                            <FormControl defaultValue={values.tenantDurationContract} type="text" name="tenantDurationContract" onChange={this.props.handleChange('tenantDurationContract')} placeholder="3,6,9 ans"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Type de bail</ControlLabel>
                            <FormControl defaultValue={values.tenantTypeContract} type="text" name="tenantTypeContract" onChange={this.props.handleChange('tenantTypeContract')} placeholder="Types de bails existant a definir"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Date de payement</ControlLabel>
                            <FormControl defaultValue={values.tenantPaymentDate} type="text" name="tenantPaymentDate" onChange={this.props.handleChange('tenantPaymentDate')} placeholder="Numéro du mois : 1-30"/>
                        </FormGroup>
                        </div>
                        <div>
                            <FormGroup>
                                <ControlLabel>Nom</ControlLabel>
                                <FormControl defaultValue={values.tenantFirstName} type="text" name="tenantFirstName" onChange={this.props.handleChange('tenantFirstName')} placeholder="John"/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Prénom</ControlLabel>
                                <FormControl defaultValue={values.tenantLastName} type="text" name="tenantLastName" onChange={this.props.handleChange('tenantLastName')} placeholder="Doe"/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Profession</ControlLabel>
                                <FormControl defaultValue={values.tenantWork} type="text" name="tenantWork" onChange={this.props.handleChange('tenantWork')} placeholder="Menuisier"/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Mail</ControlLabel>
                                <FormControl defaultValue={values.tenantMail} type="text" name="tenantMail" onChange={this.props.handleChange('tenantMail')} placeholder="john.doe@applicationame.com"/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Mobile</ControlLabel>
                                <FormControl defaultValue={values.tenantMobile} type="text" name="tenantMobile" onChange={this.props.handleChange('tenantMobile')} placeholder="06XXXXXXXX"/>
                            </FormGroup>
                        </div>
                        <FormGroup>
                            <ControlLabel>Commentaires</ControlLabel>
                            <FormControl defaultValue={values.tenantCommentary} type="textarea" name="tenantCommentary" onChange={this.props.handleChange('tenantCommentary')} placeholder="..."/>
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

export default TenantModal;