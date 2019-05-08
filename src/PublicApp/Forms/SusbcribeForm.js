import React from 'react';
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
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
                    <form id="sign_up_id" className="signup_frame_right" onSubmit={this.handleSubmit}>
                        <div className="sign_up_frame_right_wrapper">
                            <div className="signup_name_wrapper">
                                <div className="btn_gender_wrapper">
                                    <div className="btn-group btn-toggle gender">
                                        <input type="button" name="gender" className={"btn btn-"+ this.state.isMale} value="M." onClick={this.handleClickMaleGender}/>
                                        <input type="button" name="gender" className={"btn btn-" + this.state.isFemale} value="Mme" onClick={this.handleClickFemaleGender}/>
                                    </div>
                                </div>
                                <FormGroup>
                                    <ControlLabel>Nom de famille</ControlLabel>
                                    <FormControl type="text" name="last_name" onChange={this.handleChange}/>
                                    <FormControl.Feedback />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Prénom</ControlLabel>
                                    <FormControl type="text" name="first_name" onChange={this.handleChange}/>
                                    <FormControl.Feedback />
                                </FormGroup>
                            </div>
                            <div>
                                <FormGroup validationState={this.getValidationState()}>
                                    <ControlLabel>Email</ControlLabel>
                                    <FormControl type="email" name="email" onChange={this.handleChange}/>
                                    <FormControl.Feedback />
                                </FormGroup>
                                <div className="signup_name_wrapper_password">
                                    <FormGroup>
                                        <ControlLabel>Mot de passe</ControlLabel>
                                        <FormControl type="password" name="password" onChange={this.handleChange}/>
                                        <FormControl.Feedback />
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Resaisir le mot de passe</ControlLabel>
                                        <FormControl type="password" name="password2" onChange={this.handleChange}/>
                                        <FormControl.Feedback />
                                    </FormGroup>
                                </div>
                                <FormGroup validationState={this.getValidationState()}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><ControlLabel>Date d'anniversaire (MM/DD/YYYY)</ControlLabel></td>
                                                <td><DatePicker selected={this.state.startDate} onChange={this.handleChangeCalendar}/></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </FormGroup>
                                <FormGroup>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><ControlLabel>Abonnement à la newsletter</ControlLabel></td>
                                                <td>
                                                    <label className="switch">
                                                    <input type="checkbox" value={this.state.isNewsletter} checked={this.state.isNewsletter === true} onChange={(e) => this.handleChangeToogle()}/>
                                                    <span className="slider round"></span>
                                                    </label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </FormGroup>
                            </div>
                        <div className="sign_up_submit">
                            <Button type="submit" bsSize="large" active>Submit</Button>
                            <Link to="/signin">Je suis déjà membre</Link>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SusbcribeForm;