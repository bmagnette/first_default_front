import React from 'react';
import Nav from '../../Components/Common/Nav';
import Header from '../../Components/Common/Header';
import '../../../public/css/PrivateApp/card.css';
import '../../../public/css/PrivateApp/RealEstateView.css';
import {Link, Redirect} from "react-router-dom";
import DefaultImage from '../../../public/img/default_house.jpg';
import {Button, Modal, Dropdown} from 'react-bootstrap';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import EventModal from '../../Forms/Events/EventModal';
import {BACK_URL} from "../../../constants";
import numeral from "numeral";
import Calendar from 'react-calendar';
import PdfIcon from '../../../public/img/icons/file_pdf2.png';
import moment from 'moment';

class RealEstateView extends React.Component{

    constructor(props){
        super(props);
        let m = moment().utcOffset(0);
        m.set({hour:0,minute:0,second:0,millisecond:0});

        this.state = {
            date: new Date(),
            showGraphics: false,
            showDescriptif: true,
            showTenants: false,
            showDebt: false,
            AddEventModalShow: false,
            DeleteBuildingModalShow: false,
            redirect: false,

            event_date: new Date(),
            name_event: "",
            description_event: "",
            location_event: "",
            hour_event: m,
            duration_event: m,
            isAllDay: false,
            event_type: "sans"
        }
    }

    onChange = date => this.setState({ date });

    onClickButtonGraphics = () => {
        this.setState({showGraphics: true, showDescriptif: false, showTenants: false, showDebt: false});
    };

    onClickButtonDescriptifs = () => {
        this.setState({showGraphics: false, showDescriptif: true, showTenants: false, showDebt: false});
    };

    onClickButtonTenants = () => {
        this.setState({showGraphics: false, showDescriptif: false, showTenants: true, showDebt: false});
    };

    onClickButtonDebt = () => {
        this.setState({showGraphics: false, showDescriptif: false, showTenants: false, showDebt: true});
    };

    onClickAddEvent = () => {
        this.setState({
            AddEventModalShow: true
        })
    };

    onClickDeleteBuilding = () => {
        this.setState({
            DeleteBuildingModalShow: true
        });
    };

    DeleteBuilding = () => {
        let { data } = this.props.location;
        fetch(BACK_URL + 'real_estate/property/delete/' + data["id"], {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('TOKEN'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }})
            .catch(error => {
                this._addNotification(error["message"], "error")
            })
            .then(function (response) {
                return response.json();
            })
            .then(response => {
                this._addNotification(response["message"], "success");
            });

        this.setState({DeleteBuildingModalShow: false, redirect: true});
    };

    handleSubmit = (event) => {
        if(this.state.isAllDay === true){
            let date = this.state.event_date;
            date.setDate(date.getDate() + 1 );
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            this.setState({event_date: date});
        }

        fetch(BACK_URL + 'calendar/create', {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('TOKEN'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                "name_event": this.state.name_event,
                "description_event": this.state.description_event,
                "location_event": this.state.location_event,
                "event_date": this.state.event_date,
                "hour_event": this.state.hour_event,
                "duration": this.state.duration_event,
                "isAllDay": this.state.isAllDay,
                "property_id": this.state.propertyid,
                "event_type": this.state.event_type
            })
        })
            .catch(error => {
            })
            .then(function (response) {
                return response.json();
            })
            .then(response => {
                this.setInitialState();
            });
        event.preventDefault();
        this.onHide();
    };

    handleChange = (event) => {
        let field_name = event.target.name;
        let field_Val = event.target.value;
        this.setState({[field_name]: field_Val});
    };

    handleChangeCalendar = (event_date) => {
        this.setState({
            event_date: event_date
        });
    };

    handleChangeOption = (event) => {
        this.setState({event_type: event.target.value})
    };

    handleChangeCheckBox = (event) => {
        this.setState({isAllDay: event.target.checked});
    };

    render(){
        let showInformation;
        let modalClose = () => this.setState({AddEventModalShow: false});
        let modalClose2 = () => this.setState({DeleteBuildingModalShow: false});

        const { eventId, data } = this.props.location;

        const { event_date, name_event, description_event, location_event, hour_event, duration_event, isAllDay, event_type } = this.state;
        const values = { event_date, name_event, description_event, location_event, hour_event, duration_event, isAllDay, event_type };

        console.log(values);
        if(this.props.location.data === undefined){
            return <Redirect to='/immobilier'/>;
        }

        if(this.state.redirect){
            return <Redirect to='/immobilier'/>;
        }

        const data2 = [
            {
                "name": "Page A",
                "uv": 4000,
                "pv": 2400,
                "amt": 2400
            },
            {
                "name": "Page B",
                "uv": 3000,
                "pv": 1398,
                "amt": 2210
            },
            {
                "name": "Page C",
                "uv": 2000,
                "pv": 9800,
                "amt": 2290
            },
            {
                "name": "Page D",
                "uv": 2780,
                "pv": 3908,
                "amt": 2000
            },
            {
                "name": "Page E",
                "uv": 1890,
                "pv": 4800,
                "amt": 2181
            },
            {
                "name": "Page F",
                "uv": 2390,
                "pv": 3800,
                "amt": 2500
            },
            {
                "name": "Page G",
                "uv": 3490,
                "pv": 4300,
                "amt": 2100
            }
        ];

        if(this.state.showGraphics === true){
            showInformation =
                <div className="real_estate_graphics">
                    <div className="box">
                        <div className="boxHeader">
                            <h4>Rendement<span><i className="glyphicon glyphicon-chevron-down"></i></span></h4>
                        </div>
                        <div className="well">
                            <div className="boxContent">
                                <LineChart width={730} height={250} data={data2}
                                           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                </LineChart>
                            </div>
                        </div>
                    </div>
                    <div className="box">
                        <div className="boxHeader">
                            <h4>Optimisation<span><i className="glyphicon glyphicon-chevron-down"></i></span></h4>
                        </div>
                        <div className="well">
                            <div className="boxContent">
                                <div id="optimizeGraphic">
                                    <p>Optimiser le bien en fonct|ion de la durée de l'emprunt.</p>
                                    <p>Dette restante : 50000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box">
                        <div className="boxHeader">
                            <h4>Flux de trésoreries<span><i className="glyphicon glyphicon-chevron-down"></i></span></h4>
                        </div>
                        <div className="well">
                            <div className="boxContent">
                                <LineChart width={730} height={250} data={data2}
                                           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                </LineChart>
                            </div>
                        </div>
                    </div>
                    <div className="box">
                        <div className="boxHeader">
                            <h4>Fiscalité<span><i className="glyphicon glyphicon-chevron-down"></i></span></h4>
                        </div>
                        <div className="well">
                            <div className="boxContent">
                                <LineChart width={730} height={250} data={data2}
                                           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                </LineChart>
                            </div>
                        </div>
                    </div>
                </div>
        }
        else if(this.state.showDescriptif === true){
            showInformation =
                <div className="real_estate_details descriptif">
                    <div className="descriptif_info_wrapper">
                        <div className="well">
                            <h4>Charges : </h4>
                            <hr/>
                            <ul>
                                <li>{data["mortgages"]["loan_amount"]}</li>
                            </ul>
                        </div>
                        <div className="well">
                            <h4>Travaux</h4>
                            <hr/>
                            <ul>
                                <li>Quittance de loyer, avis d'échéance, contrat de location : 05/05/17</li>
                                <li>Isolation : 06/06/18</li>
                            </ul>
                        </div>
                        <div className="well">
                            <h4>Notes</h4>
                            <hr/>
                            Mon commentaire.
                        </div>
                    </div>
                    <div className="descriptif_info_calendar_wrapper">
                        <Calendar
                            onChange={this.onChange}
                            value={this.state.date}
                        />
                        <div className="descriptif_document_wrapper">
                            <div className="descriptif_document_header">
                                <h4>Documents d'aides à la gestion</h4>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th> Nom du document </th>
                                        <th> Fichier </th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Quittance de loyer</td>
                                    <td><Link to="#"><span><i className="glyphicon glyphicon-download"></i></span></Link></td>
                                </tr>
                                <tr>
                                    <td>Contrat de location</td>
                                    <td><Link to="#"><span><i className="glyphicon glyphicon-download"></i></span></Link></td>
                                </tr>
                                <tr>
                                    <td>Avis d'échéance</td>
                                    <td><Link to="#"><span><i className="glyphicon glyphicon-download"></i></span></Link></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        }
        else if(this.state.showTenants === true){
            showInformation = <div className="real_estate_details">
                    <div className="well">
                        <h4>Locataires</h4>
                        <hr/>
                        <ul>
                            <li>{data["tenants"]["first_name"]}</li>
                            <li>{data["tenants"]["last_name"]}</li>
                            <li>{data["tenants"]["work"]}</li>
                            <li>{data["tenants"]["email"]}</li>
                            <li>{data["tenants"]["mobile"]}</li>
                            <li>{data["tenants"]["contract_started"]}</li>
                            <li>{data["tenants"]["contract_duration"]}</li>
                            <li>{data["tenants"]["contract_end"]}</li>
                            <li>{data["tenants"]["contract_type"]}</li>
                            <li>{data["tenants"]["payment_date"]}</li>
                            <li>{data["tenants"]["commentary"]}</li>
                        </ul>
                    </div>
                </div>
        }
        else if(this.state.showDebt === true){
            showInformation = <div className="real_estate_details">
                <div className="well">
                    <h4>Emprunt bancaire : </h4>
                    <hr/>
                    <ul>
                        <li>{data["mortgages"]["loan_amount"]}</li>
                        <li>{data["mortgages"]["loan_fees"]}</li>
                        <li>{data["mortgages"]["loan_waranty_rate"]}</li>
                        <li>{data["mortgages"]["loan_credit_rate"]}</li>
                        <li>{data["mortgages"]["loan_total_rate"]}</li>
                        <li>{data["mortgages"]["loan_duration"]}</li>
                        <li>{data["mortgages"]["loan_payment_start"]}</li>
                        <li>{data["mortgages"]["loan_payment_end"]}</li>
                        <li>{data["mortgages"]["loan_payment_date"]}</li>
                    </ul>
                </div>
            </div>
        }
        return (
            <div id="app_container">
                <Header/>
                <div id="content_wrapper">
                    <Nav/>
                    <div className="content-right-wrapper">
                        <div className="real_estate_view_header">
                            <div>
                                <Link to="/immobilier" className="btn btn-default">
                                    <i className="glyphicon glyphicon-chevron-left"></i>
                                    Retour à la liste de biens
                                </Link>
                            </div>
                            <div>
                                <Button onClick={this.onClickAddEvent}
                                   className="btn btn-default">
                                    <i className="glyphicon glyphicon-new-window"></i>
                                    Ajouter un évènement
                                </Button>
                                <Link to={{pathname: '/immobilier/modifier', data: data}}>
                                    <Button className="btn btn-default">
                                    <i className="glyphicon glyphicon-edit"></i>
                                    Modification</Button>
                                </Link>

                                <Button onClick={this.onClickDeleteBuilding}
                                   className="btn btn-danger">
                                    <i className="glyphicon glyphicon-trash"></i>
                                    Supprimer
                                </Button>
                                <Dropdown>
                                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Ajouter une dépense</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Ajouter un revenu</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <hr/>

                        {/* DEBUT TEST */}
                        <div className="well real_estate_description">
                            <div className="real_estate_picture">
                                <img src={DefaultImage} alt="Default Image"/>
                            </div>
                            <div className="real_estate_main_description">
                                <h3>{data["type"].charAt(0).toUpperCase() + data["type"].slice(1)} : {data["city_name"]}</h3>
                                <hr/>
                                <div>
                                    <div className="real_estate_qualitative_information">
                                        <div className="real_estate_qualitative_information_global">
                                            <div>
                                                <h4>General</h4>
                                                <div className="real_estate_qualitative_information_global_ul">
                                                    <div className="real_estate_qualitative_information_global_ul_wrapper">
                                                        <ul>
                                                            <li><strong>Prix à l'achat :</strong> {numeral(data["value"]).format('0,0')}</li>
                                                            <li><strong>Imposition :</strong> {data["tax"]["name"]}</li>
                                                            <li><strong>Adresse :</strong> {data["adress"]}</li>
                                                            <li><strong>Ville :</strong> {data["city_name"]}, {data["zipcode"]}</li>
                                                            <li><strong>Caractéristiques :</strong> T{data["nb_room"]}, {data["surface"]}m²</li>
                                                            <li><strong>Fin de location :</strong> {data["tenants"]["contract_end"]}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4>Rendement</h4>
                                            <ul>
                                                <li><strong>Rendement brut :</strong> 5.3%</li>
                                                <li><strong>Rendement net :</strong> 4.2%</li>
                                                <li><strong>Cash Flow Mensuel :</strong> 50</li>
                                                <li><strong>TRI :</strong> A faire</li>
                                                <li><strong>VAN :</strong> 5</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="real_estate_button">
                            <Button className="btn btn-primary btn-lg" onClick={this.onClickButtonDescriptifs}>Descriptif détaillé</Button>
                            <Button className="btn btn-primary btn-lg" onClick={this.onClickButtonDebt}>Emprunts</Button>
                            <Button className="btn btn-primary btn-lg" onClick={this.onClickButtonTenants}>Locataires</Button>
                            <Button className="btn btn-primary btn-lg" onClick={this.onClickButtonGraphics}>Graphiques</Button>
                        </div>
                        {showInformation}
                    </div>
                </div>
                <EventModal title={"Ajouter un évènement"} buttonTitle="Ajouter" show={this.state.AddEventModalShow} onHide={modalClose} handleSubmit={this.handleSubmit} handleDelete={this.handleDelete} eventInfo={values} handleChangeOption={this.handleChangeOption} handleChangeCheckBox={this.handleChangeCheckBox} handleChange={this.handleChange} onChangeMinute={this.onChangeMinute} onChangeHour={this.onChangeHour} handleChangeCalendar={this.handleChangeCalendar}/>
                <Modal show={this.state.DeleteBuildingModalShow} onHide={modalClose2}>
                    <Modal.Header closeButton>
                        <Modal.Title>Supprimer votre bien immobilier</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Etes vous sur de vouloir le supprimer ?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.DeleteBuilding} variant="secondary">Supprimer</Button>
                        <Button onClick={this.onHide} variant="primary">Fermer</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default RealEstateView;