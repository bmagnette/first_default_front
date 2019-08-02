import React from 'react';
import Nav from '../../Components/Common/Nav';
import Header from '../../Components/Common/Header';
import {withRouter} from "react-router-dom";
import {Button} from 'react-bootstrap';
import '../../../public/css/PrivateApp/card.css';
import DefaultImage from '../../../public/img/default_house.jpg';
import {Link} from 'react-router-dom';
import numeral from "numeral";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class RealEstatePage extends React.Component{

    constructor(props){
        super(props);

        const user = JSON.parse(localStorage.getItem('USER'));

        this.state = {
            selectionProperties: "",
            properties: [],
            propertiesList: user["properties"],
            dropdownValue: { value: 'all', label: 'Tous les biens' }
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

            if(mainList[i]["type"] === event.value){
                newList.push(mainList[i])
            }
        }

        if(event.value === "all"){
            this.setState({propertiesList: mainList, dropdownValue: { value: event.value, label: event.label }})
        }
        else{
            this.setState({propertiesList: newList, dropdownValue: { value: event.value, label: event.label }})
        }
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

        const options = [
            { value: 'all', label: 'Tous les biens' },
            { value: 'immeuble', label: 'Immeuble'},
            { value: 'apartment', label: 'Appartement'},
            { value: 'house', label: 'Maison'},
            { value: 'garage', label: 'Garage'},
        ];

        return (
            <div id="app_container">
                <Header/>
                <div id="content_wrapper">
                    <Nav/>
                    <div className="content-right-wrapper2">
                        <div className="real_estate_button_header">
                            <Dropdown options={options} onChange={this.handleSelection} value={this.state.dropdownValue}/>
                            <Button onClick={this.handleClick}>Ajouter un bien</Button>
                        </div>
                        {html}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(RealEstatePage);