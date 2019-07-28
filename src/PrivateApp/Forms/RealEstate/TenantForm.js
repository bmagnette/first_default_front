import React from 'react';
import '../../../public/css/PrivateApp/card.css';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import TenantModal from "./TenantModal";


class TenantForm extends React.Component {

    unValidateForm = () => {
        this.props.prevStep("loan_form", "tenant_form")    };

    render() {
        const { values } = this.props;
        let self = this; // save object reference

        let valueList = <div></div>;
        if(values.allTenants.length === 0){
            valueList = <div className="emptyListObject">Il n'y a aucun locataire associer au bien.</div>
        }
        else{
            valueList = <div className="object_to_add_wrapper">
                {values.allTenants.map(function(listValue) {
                    return <div className="object_to_add">{listValue["tenantFirstName"]} {listValue["tenantLastName"]} - {listValue["tenantWork"]}
                        <span className="glyphicon_cursor" onClick={() => self.props.removeTenant(listValue["id"])}><i className="glyphicon glyphicon-trash"></i></span>
                        <span className="glyphicon_cursor" onClick={() => self.props.showEditTenant(listValue)}><i className="glyphicon glyphicon-edit"></i></span>
                    </div>;
                })}
            </div>
        }

        let conditionalModal = <div></div>
        if(this.props.values.eventClickedTenant === 1){
            conditionalModal = <TenantModal title={"Modifier un locataire"} buttonName={"Modifier"}  show={values.modalShowTenant} onHide={this.props.onHide} onSubmit={this.props.onSubmit} values={this.props.values.eventInfoTenant} editTenant={this.props.editTenant} handleChange={this.props.handleChange} handleChangeCalendar={this.props.handleChangeCalendar} handleChangeCheckBox={this.props.handleChangeCheckBox}/>

        }
        else{
            conditionalModal = <TenantModal title={"Ajouter un locataire"} buttonName={"Ajouter"} show={values.modalShowTenant} onHide={this.props.onHide} onSubmit={this.props.onSubmit} values={values} editTenant={this.props.editTenant} handleChange={this.props.handleChange} handleChangeCalendar={this.props.handleChangeCalendar} handleChangeCheckBox={this.props.handleChangeCheckBox}/>
        }
        return (
            <div className="add_apartment_wrapper">
                <Button onClick={this.props.unHide}>Ajouter un locataire</Button>
                {conditionalModal}

                <div className="object_list_wrapper">
                    <div className="add_object_apartment_header">
                        <h4>Locataires du bien</h4>
                    </div>
                    <div>
                        {valueList}
                    </div>
                </div>

                <div className="situation_form_wrapper_button">
                    <Button onClick={this.unValidateForm}>Précédent</Button>
                    <Button bsStyle="primary" type="submit">Enregistrer le bien</Button>
                </div>
            </div>
        )
    }
}

export default TenantForm;