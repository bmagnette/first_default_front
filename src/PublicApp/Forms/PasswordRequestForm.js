import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Redirect} from 'react-router-dom';
import '../../public/css/PublicApp/public_form.css';
import NotificationSystem from "react-notification-system";
import {BACK_URL} from "../../constants";


class PasswordRequestForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {email: "", redirectToNewPage: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    _addNotification = (message, level) =>{
        this._notificationSystem.addNotification({
            message: message,
            level: level
        })};

    componentDidMount () {
        this._notificationSystem = this.refs.notificationSystem;
    };

    handleChange= (event) =>{
        let field_name = event.target.name;
        let field_val = event.target.value;
        this.setState({[field_name]: field_val});
    };

    handleSubmit(event) {
        fetch(BACK_URL + 'auth/register/password_request', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email": this.state.email
            })})
            .catch(error => {
                this._addNotification(error["message"], "error")
            })
            .then(function(response) { return response.json(); })
            .then(response => {
                this._addNotification(response["message"], "success");
            });
        event.preventDefault();

        document.getElementById("password_request_form_id").reset();
    };

    render(){
        if(this.state.redirectToNewPage){
            return(
                <Redirect to="/contact"/>
            )
        }
        return(
            <div className="form_wrapper">
                <div>
                    <NotificationSystem ref="notificationSystem" />
                </div>
                <div className="password_request_info">
                    <p className="password_request_text">Entrer votre adresse email pour lancer la procédure de récupération d'email.</p>
                </div>
                <form id="password_request_form_id" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <ControlLabel>Email</ControlLabel>
                        <FormControl type="email" name="email" onChange={this.handleChange}/>
                        <FormControl.Feedback />
                    </FormGroup>
                    <div className="text-center">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        )
    }
}



export default PasswordRequestForm