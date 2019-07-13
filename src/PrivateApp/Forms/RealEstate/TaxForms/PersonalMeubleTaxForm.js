import React from 'react';
import '../../../../public/css/PrivateApp/card.css';
import Particulier from "../../../../public/img/particuliers-recherche-de-personnes.png";
import Entreprise from "../../../../public/img/personne-importante_318-10744.jpg";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class PersonalMeubleTaxForm extends React.Component {

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
                            <h4>Revenu BIC : Régime réel simplifié</h4>
                            <Link to="#"><img onClick={this.props.handleChange('isSimplifiedReel')} width={250} height={200} src={Particulier} alt="Régime réel simplifié"/></Link>
                            <div className="situation_form_slider">
                                <label className="switch">
                                    <input type="checkbox" value={values.isSimplifiedReel} checked={values.isSimplifiedReel === true} onChange={(e) => this.props.handleChange('isSimplifiedReel')}/>
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="situation_form_proposition">
                        <div className="situation_form_proposition">
                            <h4>Revenu BIC : Régime réel normal</h4>
                            <Link to="#"><img onClick={this.props.handleChange('isNormalReel')} width={250} height={200} src={Entreprise} alt="Détention à travers une société"/></Link>
                            <div className="situation_form_slider">
                                <label className="switch">
                                    <input type="checkbox" value={values.isNormalReel} checked={values.isNormalReel === true} onChange={(e) => this.props.handleChange('isNormalReel')}/>
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="situation_form_proposition">
                        <div className="situation_form_proposition">
                            <h4>Revenu BIC : Régime Micro-Bic</h4>
                            <Link to="#"><img onClick={this.props.handleChange('isMicroBic')} width={250} height={200} src={Entreprise} alt="Détention à travers une société"/></Link>
                            <div className="situation_form_slider">
                                <label className="switch">
                                    <input type="checkbox" value={values.isMicroBic} checked={values.isMicroBic === true} onChange={(e) => this.props.handleChange('isMicroBic')}/>
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

export default PersonalMeubleTaxForm;