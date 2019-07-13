import React from 'react';
import '../../../../public/css/PrivateApp/card.css';
import Particulier from "../../../../public/img/particuliers-recherche-de-personnes.png";
import Entreprise from "../../../../public/img/personne-importante_318-10744.jpg";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class PersonalNuTaxForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayForm: false,
        }
    }

    unValidateForm = () => {
        this.props.prevStep("type_form", "fiscalite_form_complete")
    };

    validatePartForm = () => {
        this.saveAndContinue();
    };

    saveAndContinue = () => {
        this.props.nextStep("description_form", "fiscalite_form_complete");
    };


    render() {
        const {values} = this.props;

        return (
            <div className="add_apartment_wrapper">
                <div className="situation_form_wrapper">
                    <div className="situation_form_proposition">
                        <div className="situation_form_proposition">
                            <h4>Revenu Foncier : Micro-Foncier</h4>
                            <Link to="#"><img onClick={this.props.handleChange('isMicroFoncier')} width={500} height={300} src={Particulier} alt="Détention personnel"/></Link>
                            <div className="situation_form_slider">
                                <label className="switch">
                                    <input type="checkbox" value={values.isMicroFoncier} checked={values.isMicroFoncier === true} onChange={(e) => this.props.handleChange('isMicroFoncier')}/>
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="situation_form_proposition">
                        <div className="situation_form_proposition">
                            <h4>Revenue Foncier : Régime réel</h4>
                            <Link to="#"><img onClick={this.props.handleChange('isRegimeReel')} width={500} height={300} src={Entreprise} alt="Détention à travers une société"/></Link>
                            <div className="situation_form_slider">
                                <label className="switch">
                                    <input type="checkbox" value={values.isRegimeReel} checked={values.isRegimeReel === true} onChange={(e) => this.props.handleChange('isRegimeReel')}/>
                                    <span className="slider round"></span>
                                </label>
                            </div>
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

export default PersonalNuTaxForm;