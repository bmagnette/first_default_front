import React from 'react';
import { Button, Form, FormGroup, ControlLabel } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import NotificationSystem from "react-notification-system";

class EditProfilForm extends React.Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            redirectToNewPage: false};
    }

    getValidationState() {
        const length = this.state.email.length;
        if (length > 3) return 'success';
        /*else if (length > 5) return 'warning';*/
        else if (length > 0) return 'error';
        return null;
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
        event.preventDefault();
    };


    render(){
        if(this.state.redirectToNewPage){
            return(
                <Redirect to="/services"/>
            )
        }
        return(
            /*https://react-bootstrap.github.io/components/forms/*/
            <div className="private_form_wrapper">
                <div>
                    <NotificationSystem ref="notificationSystem" />
                </div>
                <h4>Changement d'email</h4>
                <Form onSubmit={this.handleSubmit}>
                        <Form.Group validationState={this.getValidationState()}>
                            <Form.Label>Ancien email :</Form.Label>
                            <Form.Control type="email" name="old_email" onChange={this.handleChange}/>
                            <Form.Control.Feedback />
                        </Form.Group>
                        <Form.Group validationState={this.getValidationState()}>
                            <Form.Label>Nouvelle email :</Form.Label>
                            <Form.Control type="email" name="new_email" onChange={this.handleChange}/>
                            <Form.Control.Feedback />
                        </Form.Group>
                    <div className="text-center">
                        <Button type="submit">Submit</Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default EditProfilForm;