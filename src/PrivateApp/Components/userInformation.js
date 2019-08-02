import * as React from "react";
import {Redirect} from "react-router-dom";
import "../../public/css/PrivateApp/information_profil.css";
import {FormGroup, FormControl, Button} from 'react-bootstrap';
import {BACK_URL, APPLICATION_NAME} from "../../constants";

class UserInformation extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
        email: '',
        lastName: '',
        firstName: '',
        lastLogin: '',
        isConfirmed: '',
        created_date: '',
        mobile: '',
        age: '',
        birthday_date: '',
        city_name:'',
        address:'',
        postal_code:'',
        gender:'',
        isNewsletter:'',
        redirectToNewPage: false};
    }

    handleSubmit = text => event=> {
        event.preventDefault();
        fetch(BACK_URL + 'user/information', {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('TOKEN'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({
                [text]: this.state[text]
            })})
            .catch(error => {
                this._addNotification(error["message"], "error")
            })
            .then(function(response) { return response.json(); })
            .then(response => {
                this._addNotification(response["message"], "success");
            });
        event.preventDefault();
    };

    handleChange = (event) => {
        let field_name = event.target.name;
        let field_val = event.target.value;
        this.setState({[field_name]: field_val});
    };

    componentDidMount(){
        const user = JSON.parse(localStorage.getItem('USER'));
        this.setState({
            firstName: user["first_name"],
            lastName: user["last_name"],
            lastLogin: user["last_login"],
            isConfirmed: user["isConfirmed"],
            created_date: user["created_date"],
            email: user["email"],
            mobile: user["mobile"],
            age: user["age"],
            address: user["address"],
            postal_code: user["postal_code"],
            city_name: user["city_name"],
            gender: user["gender"],
            isNewsletter: user["isNewsletter"],
            birthday_date: user["birthday_date"]});
    }

    render(){
        // Mandatory information
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const email = this.state.email;
        const last_login = this.state.lastLogin;
        const created_date = this.state.created_date;

        // None default argument.
        const mobile = this.state.mobile;
        const birthday_date = this.state.birthday_date;
        {/*const gender = this.state.gender;*/}
        const city = this.state.city_name;
        const postal_code = this.state.postal_code;
        const address = this.state.address;


        if(this.state.redirectToNewPage){
            return(
            <Redirect to="/signin"/>
            )
        }
        return (
            <div>
                <div id={"test"} className="account_settings_information_frame">
                    <div className="account_settings_information_frame_header">
                        <h4>Information de base</h4>
                    </div>
                    <table>
                        <tbody>
                        <tr>
                            <td>Prénom</td>
                            <td>{firstName}</td>
                        </tr>
                        <tr>
                            <td>Nom</td>
                            <td>{lastName}</td>
                        </tr>

                        <tr>
                            <td>Email</td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td>Date d'inscription</td>
                            <td>{created_date}</td>
                        </tr>
                        <tr>
                            <td>Dernière connexion</td>
                            <td>{last_login}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="account_settings_information_frame">
                    <div className="account_settings_information_frame_header">
                        <h4>Information complémentaire</h4>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Mobile</td>
                                <td>
                                    <form onSubmit={this.handleSubmit("mobile")}>
                                        <FormGroup className="inline_information_form">
                                            <FormControl defaultValue={mobile} type="text" name="mobile" onChange={this.handleChange}/>
                                            <Button type="submit"><span className="glyphicon glyphicon-ok"></span></Button>
                                        </FormGroup>
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>Anniversaire</td>
                                <td>
                                    <form onSubmit={this.handleSubmit("birthday_date")}>
                                        <FormGroup className="inline_information_form">
                                            <FormControl defaultValue={birthday_date} type="text" name="birthday_date" onChange={this.handleChange}/>
                                            <Button type="submit"><span className="glyphicon glyphicon-ok"></span></Button>
                                        </FormGroup>
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>Adresse</td>
                                <td>
                                    <form onSubmit={this.handleSubmit("address")}>
                                        <FormGroup className="inline_information_form">
                                            <FormControl defaultValue={address} type="text" name="address" onChange={this.handleChange}/>
                                            <Button type="submit"><span className="glyphicon glyphicon-ok"></span></Button>
                                        </FormGroup>
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>Ville</td>
                                <td>
                                    <form onSubmit={this.handleSubmit("city")}>
                                        <FormGroup className="inline_information_form">
                                            <FormControl defaultValue={city} type="text" name="city" onChange={this.handleChange}/>
                                            <Button type="submit"><span className="glyphicon glyphicon-ok"></span></Button>
                                        </FormGroup>
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>Code postal</td>
                                <td>
                                    <form onSubmit={this.handleSubmit("postal_code")}>
                                        <FormGroup className="inline_information_form">
                                            <FormControl defaultValue={postal_code} type="text" name="postal_code" onChange={this.handleChange}/>
                                            <Button type="submit"><span className="glyphicon glyphicon-ok"></span></Button>
                                        </FormGroup>
                                    </form>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )

    }
}

export default UserInformation;
