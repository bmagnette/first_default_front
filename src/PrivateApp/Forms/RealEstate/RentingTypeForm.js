import React from 'react';
import '../../../public/css/PrivateApp/card.css';
import ImmeubleNu from "../../../public/img/apartment-studio-937.jpg";
import ImmeubleMeuble from "../../../public/img/Louer-sur-Airbnb-610x330.jpg";
import MainResidence from "../../../public/img/residence_principal.jpg";
import { Button, ControlLabel} from 'react-bootstrap';
import { Link } from 'react-router-dom';


class RentingTypeForm extends React.Component {

    validatePartForm = () => {
        this.props.nextStep("type_form", "situation_form_complete");
    };

    unValidateForm = () => {
        this.props.prevStep("type_real_estate_form", "situation_form")
    };


    render() {
        const { values } = this.props;

        return (

        <div className="add_apartment_wrapper">
                <div className="situation_form_wrapper">
                    <div className="situation_form_proposition">
                        <h4>Logement nu</h4>
                        <Link to="#"><img onClick={this.props.handleChange('isNu')} width={400} height={250} src={ImmeubleNu} alt="Logement nu"/></Link>
                        <div className="situation_form_slider">
                            <ControlLabel className="switch">
                                <input type="checkbox" value={values.isNu} checked={values.isNu === true} onChange={(e) => this.props.handleChange('isNu')}/>
                                <span className="slider round"></span>
                            </ControlLabel>
                        </div>
                    </div>
                    <div className="situation_form_proposition">
                        <h4>Logement meublé</h4>
                        <Link to="#"><img onClick={this.props.handleChange('isMeuble')} width={400} height={250} src={ImmeubleMeuble} alt="Logement meublé"/></Link>
                        <div className="situation_form_slider">
                            <ControlLabel className="switch">
                                <input type="checkbox" value={values.isMeuble} checked={values.isMeuble === true} onChange={(e) => this.props.handleChange('isMeuble')}/>
                                <span className="slider round"></span>
                            </ControlLabel>
                        </div>
                    </div>
                </div>
            <div className="situation_form_wrapper">
                <div className="situation_form_proposition">
                    <h4>Résidence principale</h4>
                    <Link to="#"><img onClick={this.props.handleChange('isResidence')} width={400} height={250} src={MainResidence} alt="Résidence Principale"/></Link>
                    <div className="situation_form_slider">
                        <ControlLabel className="switch">
                            <input type="checkbox" value={values.isResidence} checked={values.isResidence === true} onChange={(e) => this.props.handleChange('isResidence')}/>
                            <span className="slider round"></span>
                        </ControlLabel>
                    </div>
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

export default RentingTypeForm;