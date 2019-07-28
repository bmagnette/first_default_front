import React from 'react';
import '../../../public/css/PrivateApp/card.css';
import Particulier from "../../../public/img/particuliers-recherche-de-personnes.png";
import Entreprise from "../../../public/img/personne-importante_318-10744.jpg";
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import InventaryModal from "./InventaryModal";


class InventaryForm extends React.Component {

    validatePartForm = () =>{
        this.props.nextStep("loan_form", "inventary_form");
    };

    unValidateForm = () => {
        this.props.prevStep("description_form", "inventary_form")
    };

    render() {

        const {values} = this.props;
        console.log(values);
        let valueList = <div></div>;

        let self = this;
        if(values.allInventory.length === 0){
            valueList = <div className="emptyListObject">Il n'y a aucun objet dans l'inventaire</div>
        }
        else{
            valueList = <div className="object_to_add_wrapper">
                {values.allInventory.map(function(listValue) {
                    return <div className="object_to_add">{listValue["inventoryName"]} - {listValue["inventoryValue"]}
                        <span className="glyphicon_cursor" onClick={() =>  self.props.removeInventory(listValue["id"])}><i className="glyphicon glyphicon-trash"></i></span>
                        <span className="glyphicon_cursor" onClick={() => self.props.showEditInventory(listValue)}><i className="glyphicon glyphicon-edit"></i></span>
                    </div>;
                })}
            </div>
        }

        let conditionalModal = <div></div>
        if(this.props.values.eventClickedInventory === 1){
            conditionalModal = <InventaryModal title={"Modifier un objet"} buttonName={"Modifier"} modalShowInventory={values.modalShowInventory} onHide={this.props.onHide} onSubmit={this.props.onSubmit} editInventory={this.props.editInventory} values={this.props.values.eventInfoInventory} handleChange={this.props.handleChange} handleChangeCalendar={this.props.handleChangeCalendar} />
        }
        else{
            conditionalModal = <InventaryModal title={"Ajouter un objet"} buttonName={"Ajouter"} modalShowInventory={values.modalShowInventory} onHide={this.props.onHide} onSubmit={this.props.onSubmit} editInventory={this.props.editInventory} values={values} handleChange={this.props.handleChange} handleChangeCalendar={this.props.handleChangeCalendar} />
        }

        return (
            <div className="add_apartment_wrapper">
                <Button onClick={this.props.unHide}>Ajouter un objet</Button>
                {conditionalModal}
                <div className="object_list_wrapper">
                    <div className="add_object_apartment_header">
                        <h4>Inventaire des objets</h4>
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

export default InventaryForm;