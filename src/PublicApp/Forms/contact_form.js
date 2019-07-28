import React  from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import '../../public/css/PublicApp/public_form.css';
import {BACK_URL, APPLICATION_NAME} from "../../constants";

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _notificationSystem: null,
            email: '',
            subject: '',
            textarea: '',
            isValidField: {email: null, subject: null, textarea: null},
            isValidForm: false,
            error_msg: {isActive: false, content: "Les champs indiqués possèdent une erreur : "}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    _addNotification = (message, level) =>{
        this._notificationSystem.addNotification({
            message: message,
            level: level
        })};

    componentDidMount () {
        this._notificationSystem = this.refs.notificationSystem;
    };

    handleChange(event) {
        let field_name = event.target.name;
        let field_val = event.target.value;
        this.setState({[field_name]: field_val});

        let isValidField = this.state.isValidField;

        if(this.state.email.includes("@") && this.state.email.includes(".") && this.state.email.length >= 5){
            isValidField.email = "success";
            this.setState({isValidField})
        }
        if(this.state.subject.length >= 5){
            isValidField.subject = "success";
            this.setState({isValidField});
        }
        if(this.state.textarea.length >= 15){
            isValidField.textarea = "success";
            this.setState({isValidField});
        }

        if(this.state.isValidField.subject === "success" && this.state.isValidField.email === "success" && this.state.isValidField.textarea === "success"){
            this.setState({isValidForm: true})
        }
    }

    handleSubmit(event) {
        if(this.state.isValidForm){
            fetch(BACK_URL + 'contact', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'},
                body: JSON.stringify({
                    "email": this.state.email,
                    "subject": this.state.subject,
                    "textarea": this.state.textarea
                })})
                .catch(error => {
                    this._addNotification(error["message"], "error")
                })
                .then(function(response) { return response.json(); })
                .then(response => {
                    this._addNotification(response["message"], "success");
                });
            event.preventDefault();
            document.getElementById("contact_form_id").reset();
        }
        else {
            const error_msg = this.state.error_msg;

            error_msg.isActive = true;
            this.setState({error_msg});

            let variables_error = [];

            Object.keys(this.state.isValidField).forEach(function (key) {
                if (this.state.isValidField[key] !== "success") {
                    variables_error.push(this.state.isValidField[key])
                }
            });


            let new_msg = this.state.error_msg.content + variables_error.join();
            this.setState({error_msg: {content: new_msg}});
            event.preventDefault();
        }

    }

    isSubmitValid = () => {
    if (this.state.error_msg.isActive) {
        return (<h5>{this.state.error_msg.content}</h5>)
        }
    };

    render() {
        return (
            <div className="contact_form_container">
                <div className="contact_header">
                    <h2>Informez nous !</h2>
                    <p>Chez {APPLICATION_NAME} on apprends de nos échanges</p>
                </div>
                <div>
                    <NotificationSystem ref="notificationSystem" />
                </div>
                <Form id="contact_form_id" onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formValidationSuccess1" validationState={this.state.isValidField.email}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" name="email" onChange={this.handleChange}/>
                        <Form.Control.Feedback />
                    </Form.Group>

                    <Form.Group controlId="formValidationSuccess2" validationState={this.state.isValidField.subject}>
                        <Form.Label>Sujet</Form.Label>
                        <Form.Control required type="text" name="subject" onChange={this.handleChange}/>
                        <Form.Control.Feedback />
                    </Form.Group>

                    <Form.Group controlId="formValidationSuccess3" validationState={this.state.isValidField.textarea}>
                        <Form.Label>Texte</Form.Label>
                        <Form.Control required componentClass="textarea" name="textarea" onChange={this.handleChange}/>
                        <Form.Control.Feedback/>
                    </Form.Group>

                    <div className="text-center">
                        <div>
                            {this.isSubmitValid()}
                        </div>
                        <Button type="submit">Envoyer</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default ContactForm;