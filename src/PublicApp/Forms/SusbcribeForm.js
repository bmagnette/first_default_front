import React from 'react';
import { Button, FormControl, Form } from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import '../../public/css/PublicApp/public_form.css';
import NotificationSystem from "react-notification-system";
import {BACK_URL} from "../../constants";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class SusbcribeForm extends React.Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickMaleGender = this.handleClickMaleGender.bind(this);
        this.handleClickFemaleGender = this.handleClickFemaleGender.bind(this);
        this.state = {
            email: '',
            last_name: '',
            first_name: '',
            password: '',
            redirectToNewPage: false,
            startDate: new Date(),
            isNewsletter: false,
            isMale: "primary active",
            isFemale: "default",
            gender: '1'};
    }

    handleChangeCalendar = (date) =>{
        this.setState({
            startDate: date
        });
    };

    handleClickMaleGender(){
        this.setState({
            isMale: "primary active",
            isFemale: "default",
            gender: "0"
        });
    };

    handleClickFemaleGender(){
        this.setState({
            isMale: "default",
            isFemale: "primary active",
            gender: "1"
        });
    };

    handleChangeToogle(){
        if(this.state.isNewsletter === true){
            this.setState({
                isNewsletter: false
            });
        }
        else{
            this.setState({
                isNewsletter: true
            });
        }
    };
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
        fetch(BACK_URL + 'auth/register/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({
                "email": this.state.email,
                "last_name": this.state.last_name,
                "first_name": this.state.first_name,
                "password": this.state.password,
                "birthday_date": moment(this.state.startDate).format("DD/MM/YYYY"),
                "isNewsletter": this.state.isNewsletter,
                "gender": this.state.gender
            })})
            .catch(error => {
                console.log(error["message"]);
                this._addNotification(error["message"], "error")
            })
            .then(function(response) { return response.json(); })
            .then(response => {
                console.log(response["message"]);
                this._addNotification(response["message"], "success");
            });
        event.preventDefault();

        document.getElementById("sign_up_id").reset();
    };


    render(){
        if(this.state.redirectToNewPage){
            return(
                <Redirect to="/signin"/>
            )
        }
        return(
            /*https://react-bootstrap.github.io/components/forms/*/
            <div className="signup_form_wrapper">
                <h2 className="form_title">Petit slogan qui encourage ! </h2>
                <div>
                    <NotificationSystem ref="notificationSystem" />
                </div>
                <div className="signup_frame">
                    <div className="signup_frame_left">
                    </div>
                    <Form id="sign_up_id" className="signup_frame_right" onSubmit={this.handleSubmit}>
                        <div className="sign_up_frame_right_wrapper">
                            <div className="signup_name_wrapper">
                                <div className="btn_gender_wrapper">
                                    <div className="btn-group btn-toggle gender">
                                        <input type="button" name="gender" className={"btn btn-"+ this.state.isMale} value="M." onClick={this.handleClickMaleGender}/>
                                        <input type="button" name="gender" className={"btn btn-" + this.state.isFemale} value="Mme" onClick={this.handleClickFemaleGender}/>
                                    </div>
                                </div>
                                <Form.Group>
                                    <Form.Label>Nom de famille</Form.Label>
                                    <Form.Control type="text" name="last_name" onChange={this.handleChange}/>
                                    <Form.Control.Feedback />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Prénom</Form.Label>
                                    <FormControl type="text" name="first_name" onChange={this.handleChange}/>
                                    <FormControl.Feedback />
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group validationState={this.getValidationState()}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" onChange={this.handleChange}/>
                                    <Form.Control.Feedback />
                                </Form.Group>
                                <div className="signup_name_wrapper_password">
                                    <Form.Group>
                                        <Form.Label>Mot de passe</Form.Label>
                                        <Form.Control type="password" name="password" onChange={this.handleChange}/>
                                        <Form.Control.Feedback />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Resaisir le mot de passe</Form.Label>
                                        <Form.Control type="password" name="password2" onChange={this.handleChange}/>
                                        <Form.Control.Feedback />
                                    </Form.Group>
                                </div>
                                <Form.Group validationState={this.getValidationState()}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><Form.Label>Date d'anniversaire (MM/DD/YYYY)</Form.Label></td>
                                                <td><DatePicker selected={this.state.startDate} onChange={this.handleChangeCalendar}/></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Form.Group>
                                <Form.Group>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><Form.Label>Abonnement à la newsletter</Form.Label></td>
                                                <td>
                                                    <label className="switch">
                                                    <input type="checkbox" value={this.state.isNewsletter} checked={this.state.isNewsletter === true} onChange={(e) => this.handleChangeToogle()}/>
                                                    <span className="slider round"></span>
                                                    </label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Form.Group>
                            </div>
                        <div className="sign_up_submit">
                            <Button type="submit" bsSize="large" active>Submit</Button>
                            <Link to="/signin">Je suis déjà membre</Link>
                        </div>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

export default SusbcribeForm;