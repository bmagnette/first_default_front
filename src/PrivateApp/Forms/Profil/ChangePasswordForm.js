import React from 'react';
import { Button, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import NotificationSystem from "react-notification-system";
import {BACK_URL} from "../../../constants/index";
import {Redirect} from "react-router-dom";

class ChangePasswordForm extends React.Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            new_password: '',
            new_password2: '',
            old_password: '',
            redirectToNewPage: false};
    }

    getValidationState() {

    }

    _addNotification = (message, level) =>{
        this._notificationSystem.addNotification({
            message: message,
            level: level
        })};

    componentDidMount () {
        this._notificationSystem = this.refs.notificationSystem;
    };

    handleChange(event){
        let field_name = event.target.name;
        let field_val = event.target.value;
        this.setState({[field_name]: field_val});
    }

    handleSubmit(event) {
        fetch(BACK_URL + 'user/change_password', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem('TOKEN')},
            body: JSON.stringify({
                "old_password": this.state.old_password,
                "new_password": this.state.new_password,
                "new_password2": this.state.new_password2
            })})
            .catch(error => {
                console.log(error);
                this._addNotification(error["message"], "error")
            })
            .then(function(response) { return response.json(); })
            .then(response => {
                this.setState({ redirectToNewPage: true});
                this._addNotification(response["message"], "success");
            });
        event.preventDefault();
    };


    render(){
        if(this.state.redirectToNewPage){
            this.setState({isLoggedIn: false});
            return(
                <Redirect to="/"/>
            )
        }
        return(
            /*https://react-bootstrap.github.io/components/forms/*/
            <div className="private_form_wrapper">
                <div>
                    <NotificationSystem ref="notificationSystem" />
                </div>
                <h4>Changement de mot de passe</h4>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup validationState={this.getValidationState()}>
                        <ControlLabel>Mot de passe actuel</ControlLabel>
                        <FormControl type="password" name="old_password" onChange={this.handleChange}/>
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup validationState={this.getValidationState()}>
                        <ControlLabel>Nouveau mot de passe</ControlLabel>
                        <FormControl type="password" name="new_password" onChange={this.handleChange}/>
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup validationState={this.getValidationState()}>
                        <ControlLabel>Nouveau mot de passe</ControlLabel>
                        <FormControl type="password" name="new_password2" onChange={this.handleChange}/>
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

export default ChangePasswordForm;