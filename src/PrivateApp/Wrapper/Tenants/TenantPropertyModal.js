import React from 'react';
import {Button, Form} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';


class TenantModal extends  React.Component{

    onSubmit = () => {
        this.props.onSubmit();
        this.props.onHide();
    };

    onEdit = () => {
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

        let dynamicForm = <div></div>
        if(this.props.values.isGarant){
            dynamicForm =
                <div>
                    <Form.Group>
                        <Form.Label>Nom</Form.Label>
                        <Form.Control defaultValue={values.garantFirstName} type="text" name="garantFirstName" onChange={this.props.handleChange('garantFirstName')} placeholder="Dupont"/>
                    </Form.Group>
                        <Form.Group>
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control defaultValue={values.garantLastName} type="text" name="garantLastName" onChange={this.props.handleChange('garantLastName')} placeholder="Jean"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Lien</Form.Label>
                            <Form.Control defaultValue={values.garantLink} type="text" name="garantLink" onChange={this.props.handleChange('garantLink')} placeholder="Parent"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Salaire</Form.Label>
                            <Form.Control defaultValue={values.garantSalary} type="text" name="garantSalary" onChange={this.props.handleChange('garantSalary')} placeholder="28,000"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Métier</Form.Label>
                            <Form.Control defaultValue={values.garantWork} type="text" name="garantWork" onChange={this.props.handleChange('garantWork')} placeholder="Menuisier"/>
                        </Form.Group>
                </div>;
        }
        else{
            dynamicForm = <div></div>
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
                        <div>
                        <Form.Group>
                            <Form.Label>Début du contrat</Form.Label>
                            <DatePicker selected={values.tenantStartContract} onChange={this.props.handleChangeCalendar('tenantStartContract')}/>
                            <Form.Control.Feedback/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Durée du bail</Form.Label>
                            <Form.Control defaultValue={values.tenantDurationContract} type="text" name="tenantDurationContract" onChange={this.props.handleChange('tenantDurationContract')} placeholder="3,6,9 ans"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Type de bail</Form.Label>
                            <Form.Control defaultValue={values.tenantTypeContract} type="text" name="tenantTypeContract" onChange={this.props.handleChange('tenantTypeContract')} placeholder="Types de bails existant a definir"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date de payement</Form.Label>
                            <Form.Control defaultValue={values.tenantPaymentDate} type="text" name="tenantPaymentDate" onChange={this.props.handleChange('tenantPaymentDate')} placeholder="Numéro du mois : 1-30"/>
                        </Form.Group>
                        </div>
                        <div>
                            <Form.Group>
                                <Form.Label>Nom</Form.Label>
                                <Form.Control defaultValue={values.tenantFirstName} type="text" name="tenantFirstName" onChange={this.props.handleChange('tenantFirstName')} placeholder="John"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control defaultValue={values.tenantLastName} type="text" name="tenantLastName" onChange={this.props.handleChange('tenantLastName')} placeholder="Doe"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Profession</Form.Label>
                                <Form.Control defaultValue={values.tenantWork} type="text" name="tenantWork" onChange={this.props.handleChange('tenantWork')} placeholder="Menuisier"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Salaire</Form.Label>
                                <Form.Control defaultValue={values.tenantSalary} type="text" name="tenantSalary" onChange={this.props.handleChange('tenantSalary')} placeholder="28,000"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Mail</Form.Label>
                                <Form.Control defaultValue={values.tenantMail} type="text" name="tenantMail" onChange={this.props.handleChange('tenantMail')} placeholder="john.doe@applicationame.com"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control defaultValue={values.tenantMobile} type="text" name="tenantMobile" onChange={this.props.handleChange('tenantMobile')} placeholder="06XXXXXXXX"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Commentaires</Form.Label>
                                <Form.Control defaultValue={values.tenantCommentary} type="textarea" name="tenantCommentary" onChange={this.props.handleChange('tenantCommentary')} placeholder="..."/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Locataire avec garant</Form.Label>
                                <Form.Check type="checkbox" value={values.isGarant} checked={values.isGarant} onChange={this.props.handleChangeCheckBox}/>
                            </Form.Group>
                            {dynamicForm}
                        </div>
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

export default TenantModal;