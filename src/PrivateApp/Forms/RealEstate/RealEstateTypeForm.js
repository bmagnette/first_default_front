import React from 'react';
import '../../../public/css/PrivateApp/card.css';
import Particulier from "../../../public/img/particuliers-recherche-de-personnes.png";
import Entreprise from "../../../public/img/personne-importante_318-10744.jpg";
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


class RealEstateTypeForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOwnByCompany: false,
            isOwnByPerson: false
        }
    }

    validatePartForm = () =>{
        if(this.state.isOwnByCompany || this.state.isOwnByPerson){
            this.saveAndContinue();
        }
        else{
            console.log("THIS IS ERROR SEND MESSAGE.")
        }
    };

    saveAndContinue = () => {
        this.props.nextStep("fiscalite_form");
    };

    handleClickCompany = () => {
        if(this.state.isOwnByCompany === true){
            this.setState({
                isOwnByCompany: false
            });
        }
        else{
            this.setState({
                isOwnByCompany: true,
                isOwnByPerson: false
            });
        }
    };

    handleClickPersonaly = () => {
        if(this.state.isOwnByPerson === true){
            this.setState({
                isOwnByPerson: false
            });
        }
        else{
            this.setState({
                isOwnByPerson: true,
                isOwnByCompany: false
            });
        }
    };

    render() {
        return (
            <div>
                <div className="situation_form_wrapper">
                        <div className="situation_form_proposition">
                            <div className="situation_form_proposition">
                                <h4>Détention du bien personnel</h4>
                                <Link to="#"><img onClick={this.handleClickPersonaly} width={500} height={300} src={Particulier} alt="Détention personnel"/></Link>
                                <div className="situation_form_slider">
                                    <label className="switch">
                                        <input type="checkbox" value={this.state.isOwnByPerson} checked={this.state.isOwnByPerson === true} onChange={(e) => this.handleClickPersonaly()}/>
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="situation_form_proposition">
                            <div className="situation_form_proposition">
                                <h4>Détention du bien à travers une société</h4>
                                <Link to="#"><img onClick={this.handleClickCompany} width={500} height={300} src={Entreprise} alt="Détention à travers une société"/></Link>
                                <div className="situation_form_slider">
                                    <label className="switch">
                                        <input type="checkbox" value={this.state.isOwnByCompany} checked={this.state.isOwnByCompany === true} onChange={(e) => this.handleClickCompany()}/>
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="situation_form_wrapper_button">
                <Button onClick={this.validatePartForm}>Suivant</Button>
                </div>
            </div>
        )
    }
}

export default RealEstateTypeForm;