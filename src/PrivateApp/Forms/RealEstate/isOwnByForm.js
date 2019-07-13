import React from 'react';
import '../../../public/css/PrivateApp/card.css';
import Particulier from "../../../public/img/particuliers-recherche-de-personnes.png";
import Entreprise from "../../../public/img/personne-importante_318-10744.jpg";
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


class IsOwnByForm extends React.Component {

    validatePartForm = () =>{
        this.props.nextStep("fiscalite_form", "type_form_complete");
    };

    unValidateForm = () => {
        this.props.prevStep("situation_form", "type_form_complete")
    };

    render() {
        const {values} = this.props;

        return (
            <div className="add_apartment_wrapper">
                <div className="situation_form_wrapper">
                        <div className="situation_form_proposition">
                            <div className="situation_form_proposition">
                                <h4>Détention du bien personnel</h4>
                                <Link to="#"><img onClick={this.props.handleChange('isOwnByPersonal')} width={500} height={300} src={Particulier} alt="Détention personnel"/></Link>
                                <div className="situation_form_slider">
                                    <label className="switch">
                                        <input type="checkbox" value={values.isOwnByPersonal} checked={values.isOwnByPersonal === true} onChange={(e) => this.props.handleChange('isOwnByPersonal')}/>
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="situation_form_proposition">
                            <div className="situation_form_proposition">
                                <h4>Détention du bien à travers une société</h4>
                                <Link to="#"><img onClick={this.props.handleChange('isOwnByCompany')} width={500} height={300} src={Entreprise} alt="Détention à travers une société"/></Link>
                                <div className="situation_form_slider">
                                    <label className="switch">
                                        <input type="checkbox" value={values.isOwnByCompany} checked={values.isOwnByCompany === true} onChange={(e) => this.props.handleChange('isOwnByCompany')}/>
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

export default IsOwnByForm;