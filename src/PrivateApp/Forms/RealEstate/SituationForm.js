import React from 'react';
import '../../../public/css/PrivateApp/card.css';
import ImmeubleNu from "../../../public/img/apartment-studio-937.jpg";
import ImmeubleMeuble from "../../../public/img/Louer-sur-Airbnb-610x330.jpg";
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


class SituationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isNuClicked: false,
            isMeubleClicked: false
        }
    }
    handleClickNu = () => {
        if(this.state.isNuClicked === true){
            this.setState({isNuClicked: false});
        }
        else{
            this.setState({isNuClicked: true, isMeubleClicked: false});
        }
    };

    handleClickMeuble = () => {
        if(this.state.isMeubleClicked === true){
            this.setState({isMeubleClicked: false});
            }
        else{
            this.setState({isMeubleClicked: true, isNuClicked: false});
        }
    };

    validatePartForm = () => {
        if(this.state.isMeubleClicked || this.state.isNuClicked){
            this.saveAndContinue();
        }
        else{
            console.log("THIS IS ERROR SEND MESSAGE.")
        }
    };

    saveAndContinue = () => {
        this.props.nextStep("type_form");
    };

    render() {
        return (
            <div>
                <div className="situation_form_wrapper">
                    <div>
                        <div className="situation_form_proposition">
                            <h4>Logement nu</h4>
                            <Link to="#"><img onClick={this.handleClickNu} width={500} height={300} src={ImmeubleNu} alt="Logement nu"/></Link>
                            <div className="situation_form_slider">
                                <label className="switch">
                                    <input type="checkbox" value={this.state.isNuClicked} checked={this.state.isNuClicked === true} onChange={(e) => this.handleClickNu()}/>
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="situation_form_proposition">
                            <h4>Logement meublé</h4>
                            <Link to="#"><img onClick={this.handleClickMeuble} width={500} height={300} src={ImmeubleMeuble} alt="Logement meublé"/></Link>
                            <div className="situation_form_slider">
                                <label className="switch">
                                    <input type="checkbox" value={this.state.isMeubleClicked} checked={this.state.isMeubleClicked === true} onChange={(e) => this.handleClickMeuble()}/>
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

export default SituationForm;