import React from 'react';
import Nav from '../../Components/Common/Nav';
import Header from '../../Components/Common/Header';
import {withRouter} from "react-router-dom";
import {Clearfix, Button, MenuItem, DropdownButton, Dropdown} from 'react-bootstrap';
import '../../../public/css/PrivateApp/card.css';
import DefaultImage from '../../../public/img/default_house.jpg';
import {Link} from 'react-router-dom';
import numeral from "numeral";

class RealEstatePage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selectionProperties: "",
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

        if(propertiesList.length === 0){
            html = <div className="cards_wrapper">
                <div className="default_card">
                    <div className="card_wrapper">
                        <div className="card_picture">
                            <img src={DefaultImage} alt="Home"/>
                        </div>
                        <div className="card_header">
                            <h4><strong>Ajouter votre premier bien.</strong></h4>
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
                        return(<div key={"property_card_" + object["id"]}>
                            <Link to={{pathname:"/immobilier/view", data: object, eventId: object["id"]}}>
                            <div className="card_wrapper">
                                <div className="card_picture">
                                    <img src={DefaultImage} alt="Default"/>
                                </div>
                                <div className="card_header">
                                    <h4>{object["city_name"]} - {object["adress"]}</h4>
                                </div>
                                <ul>
                                    <li>Valorisation : {numeral(object["value"]).format("0,0")}</li>
                                    <li>Rendement brut: {object["yield"]["BRUT"]}%</li>
                                    <li>Rendement net : {object["yield"]["NET"]}%</li>
                                    <li>Liquidité : {object["yield"]["CASH"]}</li>
                                    <li>Caractéristiques : T{object["nb_room"]} - {object["surface"]}m²</li>
                                </ul>
                                <div>
                                </div>
                            </div>
                                </Link>
                        </div>)
                    })}

                </div>
        }

        return (
            <div id="app_container">
                <Header/>
                <div id="content_wrapper">
                    <Nav/>
                    <div className="content-right-wrapper2">
                        {/*<Dropdown>*/}
                            {/*<Dropdown.Toggle variant="success" id="dropdown-basic">*/}
                                {/*Dropdown Button*/}
                            {/*</Dropdown.Toggle>*/}

                            {/*<Dropdown.Menu>*/}
                                {/*<Dropdown.Item href="#/action-1">Action</Dropdown.Item>*/}
                                {/*<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>*/}
                                {/*<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
                            {/*</Dropdown.Menu>*/}
                        {/*</Dropdown>*/}
                        <Button onClick={this.handleClick}>Ajouter un bien</Button>
                        {html}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(RealEstatePage);