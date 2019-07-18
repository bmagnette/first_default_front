import React from 'react';
import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {BACK_URL} from "../../../constants";


class FinancialInfoForm extends React.Component{
    constructor(props){
        super(props);
        const user = JSON.parse(localStorage.getItem('USER'));
        this.state = {
            global_revenu: user["financial_information"]["salary"],
            part_number: user["financial_information"]["household_part"],
            tmi: user["financial_information"]["tmi"]
        }
    }

    handleChange = (event) => {
        let field_name = event.target.name;
        let field_val = event.target.value;
        this.setState({[field_name]: field_val});
    };

    handleChangeOption = (event) => {
        this.setState({tmi: event.target.value});
        console.log(this.state);
    };

    handleSubmit = (event) => {
        fetch(BACK_URL + 'user/financial_information', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem('TOKEN')},
            body: JSON.stringify({
                "household_salary": this.state.global_revenu,
                "household_part_number": this.state.part_number,
                "tmi": this.state.tmi
            })})
            .catch(error => {
                console.log(error);
                this._addNotification(error["message"], "error")
            })
            .then(function(response) { return response.json(); })
            .then(response => {
                this._addNotification(response["message"], "success");
            });
        event.preventDefault();
    };

    render(){
        return(
            <form>
                <FormGroup>
                    <ControlLabel>Revenu global du foyer</ControlLabel>
                    <FormControl defaultValue={this.state.global_revenu} type="text" placeholder="48000e brut" name="global_revenu" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Nombre de parts</ControlLabel>
                    <FormControl defaultValue={this.state.part_number} type="text" placeholder="4 parts" name="part_number" onChange={this.handleChange}/>
                </FormGroup>
                <div>
                    <ControlLabel>Taux marginal d'imposition</ControlLabel>
                    <select defaultValue={this.state.tmi} onChange={this.handleChangeOption}>
                        <option name={"option_0"} value={0}>0 %</option>
                        <option name={"option_14"} value={14}>14 %</option>
                        <option name={"option_32"} value={32}>32 %</option>
                        <option name={"option_41"} value={41}>41 %</option>
                        <option name={"option_45"} value={45}>45 %</option>
                </select>
                </div>
                <Button onClick={this.handleSubmit} variant="primary" type="submit">Enregistrer</Button>
            </form>
        )
    }
}

export default FinancialInfoForm;