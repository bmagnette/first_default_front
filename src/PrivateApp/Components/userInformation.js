import * as React from "react";
import {Redirect} from "react-router-dom";


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
        city:'',
        address:'',
        postal_code:'',
        gender:'',
        isNewsletter:'',
        redirectToNewPage: false};
    }

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
            city: user["city"],
            gender: user["gender"],
            isNewsletter: user["isNewsletter"],
            birthday_date: user["birthday_date"]});
    }

    render(){
        // Mandatory information
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const email = this.state.email;
        {/*const isConfirmed = this.state.isConfirmed;*/}
        const last_login = this.state.lastLogin;
        const created_date = this.state.created_date;

        // None default argument.
        {/*const age = this.state.age;*/}
        const mobile = this.state.mobile;
        const birthday_date = this.state.birthday_date;
        console.log(birthday_date);
        {/*const gender = this.state.gender;*/}
        const city = this.state.city;
        const postal_code = this.state.postal_code;
        const address = this.state.address;

        const isFullfiled = (variable) =>{
            for(let key in variable){
                if(variable[key] === "None" || variable[key] === null){
                    return <a id={"click_form_"+Object.keys(variable)[0]} onClick={clickToForm(Object.keys(variable)[0])}>Ajouter.</a>
                }
                else{
                    return(
                        <div>{variable[key]}</div>
                    )
                }
            }
        };

        const clickToForm = (variable) =>{
            const id_to_transform = "click_form_"+ variable;
            console.log(variable);
            console.log(id_to_transform);
            {/*const formHTML = "Hello world";*/}

            {/*ReactDOM.render(formHTML, document.getElementById(id_to_transform));*/}

        };
        if(this.state.redirectToNewPage){
            return(
            <Redirect to="/signin"/>
            )
        }
        return (
            <div>
                <div className="account_settings_information_frame">
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
                            <td>{isFullfiled({mobile})}</td>
                        </tr>
                        <tr>
                            <td>Anniversaire</td>
                            <td>{isFullfiled({birthday_date})}</td>
                        </tr>
                        <tr>
                            <td>Adresse</td>
                            <td>{isFullfiled({address})}</td>
                        </tr>
                        <tr>
                            <td>Ville</td>
                            <td>{isFullfiled({city})}</td>
                        </tr>
                        <tr>
                            <td>Code postal</td>
                            <td>{isFullfiled({postal_code})}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )

    }
}

export default UserInformation;
