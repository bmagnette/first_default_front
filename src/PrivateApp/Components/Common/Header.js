import React from 'react';
import '../../../public/css/PrivateApp/Header.css'
import {Link} from "react-router-dom";
import {APPLICATION_NAME} from "../../../constants";
import spaceShip from "../../../public/img/space-ship.png";
import plane from "../../../public/img/plane.png";
import paperplane from "../../../public/img/paper-plane.png";

class PrivateHeader extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            user_profil: ''
        }
    }

    componentDidMount(){
        const user = JSON.parse(localStorage.getItem('USER'));
        this.setState({ first_name: user["first_name"],
            last_name: user["last_name"],
            user_profil: user["role_user"]})
    }

    Disconnect_account = () =>{
        console.log("CA MARCHE QUAND MEME");
    };

    render(){
        const first_name = this.state.first_name;
        const last_name = this.state.last_name;

        let user_picture;
        if(this.state.user_profil === "Member"){
            user_picture = paperplane
        }
        else if(this.state.user_profil === "Pro"){
            user_picture = spaceShip
        }
        else{
            user_picture = plane
        }
    return (
        <div id="header_app">
            <Link id="nav_logo" to="/dashboard">
                <div>
                    {APPLICATION_NAME}
                    <hr className="nav_separator"/>
                </div>
            </Link>
            <div className="header_menu_wrapper">
                <ul id="menu-demo2">
                    <li>
                        <img width={40} height={40} src={user_picture} alt="Profile de l'utilisateur"/>
                        {first_name } {last_name}
                        <ul>
                            <li className="lien_cliquable"><Link to="/profil">Mes paramètres</Link></li>
                            <li className="lien_cliquable"><Link onClick={this.Disconnect_account()} to="/">Se déconnecter</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}};

export default PrivateHeader;