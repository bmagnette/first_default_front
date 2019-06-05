import React from 'react';
import '../../../public/css/PrivateApp/card.css';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';


class TenantForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayForm: false,
        }
    }

    render() {

        return (
            <div>
                <div className="situation_form_wrapper">
                    <div>
                        <FormGroup>
                            <ControlLabel>Début de contrat</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Durée du bail</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Type de bail</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Date de payement</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                    </div>
                    <div>
                        <FormGroup>
                            <ControlLabel>Nom</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Prénom</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Profession</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Mail</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Mobile</ControlLabel>
                            <FormControl type="text" name="first_name" />
                        </FormGroup>
                    </div>
                </div>
                <div>
                    <FormGroup>
                        <ControlLabel>Commentaires</ControlLabel>
                        <FormControl type="textarea" name="first_name" />
                    </FormGroup>
                </div>
            </div>
        )
    }
}

export default TenantForm;