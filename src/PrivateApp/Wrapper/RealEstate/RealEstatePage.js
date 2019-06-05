import React from 'react';
import Nav from '../../Components/Common/Nav';
import Header from '../../Components/Common/Header';
import {Button} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import '../../../public/css/PrivateApp/card.css';
import DefaultImage from '../../../public/img/default_house.jpg';
import {Link} from 'react-router-dom';


class RealEstatePage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            properties: [],
        }
    }

    handleClick = () => {
        this.props.history.push("/immobilier/ajouter");
    };

    render(){
        const user = JSON.parse(localStorage.getItem('USER'));

        let html = <div></div>;
        let propertiesList = user["properties"];

        if(propertiesList === undefined){
            html = <div className="cards_wrapper">
                <div className="default_card">
                    <div className="card_wrapper">
                        <div className="card_picture">
                            <img src={DefaultImage} alt="Home"/>
                        </div>
                        <div className="card_header">
                            <h4><strong>Veuillez ajouter vos biens</strong></h4>
                        </div>
                        <ul>
                            <li>Test</li>
                            <li>Rendement</li>
                            <li>Risque</li>
                        </ul>
                    </div>
                </div>
            </div>
        }
        else{
            {/* Generate all real estate div */}
            html =
                <div className="cards_wrapper">
                    {propertiesList.map(function(object) {
                        return(<Link to={{pathname:"/immobilier/view", data: object}}>
                        <div className="card_wrapper">
                            <div className="card_picture">
                                <img src={DefaultImage} alt="Default"/>
                            </div>
                            <div className="card_header">
                                <h3>{object["city"]} : <br/>{object["adress"]}</h3>
                            </div>
                            <ul>
                                <li>Valorisation : {object["price"]}</li>
                                <li>Rendement : </li>
                                <li>Caractéristiques : T{object["room"]} - {object["surface"]}m²</li>
                            </ul>
                            <div>
                            </div>
                        </div>
                            </Link>)
                    })}

                </div>
        }

        return (
            <div id="app_container">
                <Header/>
                <div id="content_wrapper">
                    <Nav/>
                    <div className="content-right-wrapper2">
                        <Button onClick={this.handleClick}>Ajouter un bien</Button>
                        {html}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(RealEstatePage);