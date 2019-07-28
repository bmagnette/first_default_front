import React from 'react';
import Nav from '../../Components/Common/Nav';
import Header from '../../Components/Common/Header';
import {withRouter} from "react-router-dom";
import {Button, DropdownButton, Dropdown} from 'react-bootstrap';
import '../../../public/css/PrivateApp/card.css';
import DefaultImage from '../../../public/img/default_house.jpg';
import {Link} from 'react-router-dom';
import numeral from "numeral";
class RealEstatePage extends React.Component{

    constructor(props){
        super(props);

        const user = JSON.parse(localStorage.getItem('USER'));

        this.state = {
            selectionProperties: "",
            properties: [],
            propertiesList: user["properties"],
        }
    }

    handleClick = () => {
        this.props.history.push("/immobilier/ajouter");
    };

    handleSelection = (event) => {
        const user = JSON.parse(localStorage.getItem('USER'));
        let mainList = user["properties"];

        let newList = [];
        for(let i = 0, size = mainList.length; i < size ; i++){

            if(mainList[i]["type"] === event.target.name){
                newList.push(mainList[i])
            }
        }

        if(event.target.name === "all"){
            this.setState({propertiesList: mainList})
        }
        else{
            this.setState({propertiesList: newList})
        }
        console.log(this.state);
    };

    render(){

        let html = <div></div>;

        if(this.state.propertiesList.length === 0){
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
                    {this.state.propertiesList.map(function(object) {
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
                        <div className="real_estate_button_header">
                            <div>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Sélection par type
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item name="all" onClick={this.handleSelection}>Tous les biens</Dropdown.Item>
                                        <Dropdown.Item name="immeuble" onClick={this.handleSelection}>Immeuble</Dropdown.Item>
                                        <Dropdown.Item name="apartment" onClick={this.handleSelection}>Appartement</Dropdown.Item>
                                        <Dropdown.Item name="house" onClick={this.handleSelection}>Maison</Dropdown.Item>
                                        <Dropdown.Item name="garage" onClick={this.handleSelection}>Garage</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div>
                                <Button onClick={this.handleClick}>Ajouter un bien</Button>
                            </div>
                        </div>
                        {html}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(RealEstatePage);