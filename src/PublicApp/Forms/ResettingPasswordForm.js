import React from 'react';
import {Button, Form} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import '../../public/css/PublicApp/public_form.css';
import NotificationSystem from "react-notification-system";
import {BACK_URL} from "../../constants";

class ResettingPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_password: "",
            second_password: "",
            redirectToNewPage: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    _addNotification = (message, level) => {
        this._notificationSystem.addNotification({
            message: message,
            level: level
        })
    };

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    };

    handleChange = (event) => {
        let field_name = event.target.name;
        let field_val = event.target.value;
        this.setState({[field_name]: field_val});
    };

    handleSubmit(event) {
        let params = (new URL(document.location)).searchParams;
        let token = params.get("token");

        fetch(BACK_URL + 'auth/register/reset_password/' + token, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "first_password": this.state.first_password,
                "second_password": this.state.second_password
            })
        })
            .catch(error => {
                this._addNotification(error["message"], "error")
            })
            .then(function (response) {
                return response.json();
            })
            .then(response => {
                this._addNotification(response["message"], "success");
            });
        event.preventDefault();

        document.getElementById("password_reset_id").reset();
    };

    render() {
        if (this.state.redirectToNewPage) {
            return (
                <Redirect to="/contact"/>
            )
        }
        return (
            <div className="form_wrapper">
                <div>
                    <NotificationSystem ref="notificationSystem"/>
                </div>
                <div className="password_request_info">
                    <p className="password_request_text">Vous pouvez maintenant modifier votre mot de passe</p>
                </div>
                <Form id="password_reset_id" onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" name="first_password" onChange={this.handleChange}/>
                        <Form.Control.Feedback/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" name="second_password" onChange={this.handleChange}/>
                        <Form.Control.Feedback/>
                    </Form.Group>
                    <div className="text-center">
                        <Button type="submit">Submit</Button>
                    </div>
                </Form>
            </div>
        )
    }
}


export default ResettingPasswordForm