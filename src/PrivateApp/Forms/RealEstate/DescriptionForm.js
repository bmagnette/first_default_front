import React from 'react';
import '../../../public/css/PrivateApp/card.css';
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';


class DescriptionForm extends React.Component {

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
        this.props.nextStep("loan_form");
    };

    render() {

        return (
            <div>
                <div className="situation_form_wrapper2">
                    <FormGroup>
                        <ControlLabel>Adresse</ControlLabel>
                        <FormControl type="text" name="first_name" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Code postal</ControlLabel>
                        <FormControl type="text" name="first_name" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Ville</ControlLabel>
                        <FormControl type="text" name="first_name" />
                    </FormGroup>
                </div>
                <div className="situation_form_wrapper">
                    <div>
                        <FormGroup>
                            <ControlLabel>Montant à l'achat</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Prix du Notaire</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Frais d'agence</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Mobilier</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Travaux</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                    </div>
                    <div>
                        <FormGroup>
                            <ControlLabel>Loyer</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Taxe Foncière</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>TEOM</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Assurance PNO</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Assurance Loyer impayé</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Charges de copropriété</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                    </div>
                    <div>
                        <FormGroup>
                            <ControlLabel>Taux de vacances</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Taux de maintenances</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                    </div>
                </div>
                <div className="situation_form_wrapper_button">
                    <Button onClick={this.validatePartForm}>Suivant</Button>
                </div>
            </div>
        )
    }
}

export default DescriptionForm;