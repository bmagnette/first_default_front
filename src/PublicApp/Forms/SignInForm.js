import React from 'react';
import { Form, Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import '../../public/css/PublicApp/public_form.css';
import NotificationSystem from "react-notification-system";
import {APPLICATION_NAME, BACK_URL} from "../../constants";


class SignInForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            _notificationSystem: null,
            email: "",
            password: "",
            redirectToNewPage: false,
            showisConfirmed: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.ShowDialog = this.ShowDialog.bind(this);
    }

    _addNotification = (message, level) =>{
        this._notificationSystem.addNotification({
            message: message,
            level: level
        })};

    componentDidMount () {
        this._notificationSystem = this.refs.notificationSystem;
    };

    handleChange = (event) =>{
        let field_name = event.target.name;
        let field_Val = event.target.value;
        this.setState({[field_name]: field_Val});
    };

    handleSubmit = (event) =>{
        fetch(BACK_URL + 'auth/connexion/login', {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Basic '+ btoa(this.state.email + ':' + this.state.password),
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
        })
            .then(processResponse)
            .then(response => {
                localStorage.setItem('USER', JSON.stringify(response["data"]["user"]["user"]));
                localStorage.setItem('TOKEN', response["data"]["user"]["token"]);
                this.setState({ redirectToNewPage: true});
            })
            .catch(response  => {
                if(response.status === 400){this._addNotification("Identifiant incorrect", "error")}
                if(response.status === 401){this.setState({ showisConfirmed: true})}
                if(response.status === 405){
                    this._addNotification("User doesnt exist", "error");
                }
            });
        event.preventDefault();

        document.getElementById("sign_in_id").reset();

        function processResponse(response) {
            return new Promise((resolve, reject) => {
                let func;
                response.status < 400 ? func = resolve : func = reject;
                response.json().then(data => func({'status': response.status, 'data': data}));
            });
        }
    };

    ShowDialog = () => {
        if(this.state.showisConfirmed){
            return(
                <div className="pop_up_information">
                    <p>Compte non confirmé. Pour recevoir un autre email de confirmation, c'est <Link onClick={this.OnClick} to="/">ici</Link></p>
                </div>
            )
        }
        return null
    };

    OnClick = (event) => {
        fetch(BACK_URL + 'auth/register/reconfirm', {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }),
            body: JSON.stringify({
                "email": this.state.email,
            })})
            .catch(error => {this._addNotification(error["message"], "error")})
            .then(function(response) {return response.json()})
            .then(response => {this._addNotification(response["message"], "success")});
        event.preventDefault();
    };
    render(){
        if(this.state.redirectToNewPage){
            this.setState({isLoggedIn: true});
            return(
                <Redirect to="/dashboard"/>
            )
        }

        return(
            <div className="form_wrapper">
                <div>
                    <NotificationSystem ref="notificationSystem" />
                </div>
                <h2 className="form_title">{APPLICATION_NAME}</h2>
                {this.ShowDialog()}
                <form id="sign_in_id" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <ControlLabel>Email</ControlLabel>
                        <FormControl type="email" name="email" onChange={this.handleChange}/>
                        <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl type="password" name="password" onChange={this.handleChange}/>
                        <FormControl.Feedback />
                    </FormGroup>

                    <div className="text-center">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
                <Link to="/new_password_request">Mot de passe oublié ?</Link>
            </div>
        )}
}

export default SignInForm;