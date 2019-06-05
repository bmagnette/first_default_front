import React from 'react';
import '../../../public/css/PrivateApp/card.css';
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';


class PretBancaireForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            event_date: new Date(),
        }
    }

    handleChangeCalendar = (event_date) => {
        this.setState({
            event_date: event_date
        });
    };

    saveAndContinue = () => {
        this.props.nextStep("tenant_form");
    };

    validatePartForm = () => {
        this.saveAndContinue();
    };

    render() {
        let mylist = [];
        for (let i=2; i < 32; i++) {
            mylist.push(<option value={i}>{i}</option>)
        }

        return (
            <div>
                <FormGroup>
                    <ControlLabel>Montant du prêt</ControlLabel>
                    <FormControl type="text" name="loan_amount" />
                </FormGroup>
                <FormGroup controlId="exampleForm.ControlSelect1">
                    <ControlLabel>Durée du prêt</ControlLabel>
                    <select defaultValue="15">
                        {mylist.map(function(listValue){
                            return listValue;
                        })}
                    </select>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Taux de l'assurance</ControlLabel>
                    <FormControl type="text" name="insurance_rate" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Taux du prêt</ControlLabel>
                    <FormControl type="text" name="capital_rate" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Date</ControlLabel>
                    <DatePicker selected={this.state.event_date} onChange={this.handleChangeCalendar}/>
                    <FormControl.Feedback/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Frais de dossiers</ControlLabel>
                    <FormControl type="text" name="loan_fees"/>
                </FormGroup>
                <div className="situation_form_wrapper_button">
                    <Button onClick={this.validatePartForm}>Suivant</Button>
                </div>
            </div>
        )
    }
}

export default PretBancaireForm;