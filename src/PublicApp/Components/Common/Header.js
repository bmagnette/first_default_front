import React from 'react';
import '../../../public/css/PublicApp/Header.css'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {APPLICATION_NAME} from '../../../constants/index';

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isScrolling: this.props.isScrolling,
            isIndex: this.props.isIndex,
            LogoRedirection: this.props.LogoRedirection
        };
    }

    componentDidMount() {
        if(!this.state.isScrolling){
            let myNav = document.getElementById('public_header_app');
            myNav.classList.add("colored-container");
        }
    }

    isIndex(){
        if(this.state.isIndex){
            return(
                <div id="header_menu">
                    <ul>
                        <li><Link to="/susbcribe"><Button>S'inscrire</Button></Link></li>
                        <li><Link to="/signin"><Button>Connexion</Button></Link></li>
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Link to="/"><Button>Retour sur le site</Button></Link>
                </div>
            )
        }
    }
    render(){
    return (
        <div id="public_header_app">
            <Link to={this.state.LogoRedirection} className="application_name">{APPLICATION_NAME}</Link>
            {this.isIndex()}
        </div>
    );
}}

export default Header