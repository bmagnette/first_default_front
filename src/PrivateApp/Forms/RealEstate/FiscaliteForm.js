import React from 'react';
import '../../../public/css/PrivateApp/card.css';
import ImmeubleMeuble from "../../../public/img/Louer-sur-Airbnb-610x330.jpg";
import { Button } from 'react-bootstrap';


class FiscaliteForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayForm: false,
        }
    }

    validatePartForm = () => {
        this.saveAndContinue();
    };

    saveAndContinue = () => {
        this.props.nextStep("description_form");
    };

    render() {

        return (
            <div>
                <div className="situation_form_wrapper">
                    <div>
                        <h3>Pour NU</h3>
                        <div>
                            <p>Régime réel</p>
                        </div>
                        <div>
                            <p>Micro-Foncier</p>
                        </div>
                    </div>
                    <div>
                        <h3>Pour Meuble</h3>
                        <div>
                            <p>Régime réel simplifié</p>
                        </div>
                        <div>
                            <p>Micro-Bic</p>
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

export default FiscaliteForm;