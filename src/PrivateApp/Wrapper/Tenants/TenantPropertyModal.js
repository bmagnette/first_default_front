import React from 'react';
import {Button, FormGroup, ControlLabel, FormControl, Checkbox, Modal} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Dropdown from 'react-dropdown'


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
                    <FormGroup>
                        <ControlLabel>Nom</ControlLabel>
                        <FormControl defaultValue={values.garantFirstName} type="text" name="garantFirstName" onChange={this.props.handleChange('garantFirstName')} placeholder="Dupont"/>
                    </FormGroup>
                        <FormGroup>
                            <ControlLabel>Prénom</ControlLabel>
                            <FormControl defaultValue={values.garantLastName} type="text" name="garantLastName" onChange={this.props.handleChange('garantLastName')} placeholder="Jean"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Lien</ControlLabel>
                            <FormControl defaultValue={values.garantLink} type="text" name="garantLink" onChange={this.props.handleChange('garantLink')} placeholder="Parent"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Salaire</ControlLabel>
                            <FormControl defaultValue={values.garantSalary} type="text" name="garantSalary" onChange={this.props.handleChange('garantSalary')} placeholder="28,000"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Métier</ControlLabel>
                            <FormControl defaultValue={values.garantWork} type="text" name="garantWork" onChange={this.props.handleChange('garantWork')} placeholder="Menuisier"/>
                        </FormGroup>
                </div>;
        }
        else{
            dynamicForm = <div></div>
        }

        let res_options = [];
        let buildings = this.props.values.properties;

        for(let id in buildings){
            res_options.push({value: buildings[id]["id"], label: buildings[id]["city_name"] + " - " + buildings[id]["adress"]})
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
                                <ControlLabel>Bien associé</ControlLabel>
                                <Dropdown options={res_options} onChange={this.props.handleSelection} value={values.dropdownValue}/>
                            </FormGroup>
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
                                <ControlLabel>Salaire</ControlLabel>
                                <FormControl defaultValue={values.tenantSalary} type="text" name="tenantSalary" onChange={this.props.handleChange('tenantSalary')} placeholder="28,000"/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Mail</ControlLabel>
                                <FormControl defaultValue={values.tenantMail} type="text" name="tenantMail" onChange={this.props.handleChange('tenantMail')} placeholder="john.doe@applicationame.com"/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Mobile</ControlLabel>
                                <FormControl defaultValue={values.tenantMobile} type="text" name="tenantMobile" onChange={this.props.handleChange('tenantMobile')} placeholder="06XXXXXXXX"/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Commentaires</ControlLabel>
                                <FormControl defaultValue={values.tenantCommentary} type="textarea" name="tenantCommentary" onChange={this.props.handleChange('tenantCommentary')} placeholder="..."/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Locataire avec garant</ControlLabel>
                                <Checkbox type="checkbox" value={values.isGarant} checked={values.isGarant} onChange={this.props.handleChangeCheckBox}/>
                            </FormGroup>
                            {dynamicForm}
                        </div>
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