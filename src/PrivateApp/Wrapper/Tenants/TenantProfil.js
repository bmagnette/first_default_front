import React from 'react';
import Nav from '../../Components/Common/Nav';
import Header from '../../Components/Common/Header';
import '../../../public/css/PrivateApp/tenant.css';
import {Button, Modal} from "react-bootstrap";
import TenantPaymentTable from "../../Tables/TenantPaymentTable";
import {Link} from "react-router-dom";
import { Redirect } from 'react-router-dom'
import {BACK_URL} from "../../../constants";

class TenantProfil extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            tenantInfo: {},
            redirectToTenantPage: false,
            showDeleteModal: false
        }
    }

    handleDelete = () => {
        fetch(BACK_URL + 'tenant/delete/' + this.state.tenantInfo.id, {
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
        this.setState({showDeleteModal: false});
    };

    componentDidMount(){

        const user = JSON.parse(localStorage.getItem('USER'));
        let currentTenant = user["current_tenants"];

        let self = {};
        if(this.props.location.rowInfo === undefined){
            this.setState({redirectToTenantPage: true});
        }
        else{
            let valuesID  = this.props.location.rowInfo;

            currentTenant.map(function(object , id) {
                if(object.id === valuesID){
                    self = object;
                }
            });
        }
        this.setState({tenantInfo: self});
    }

    // Pick ID of tenant and display all payment + all information
    render(){

        if(this.state.redirectToTenantPage){
            return <Redirect to={{pathname: '/locataire'}}/>
        }

        let listGarant = <div></div>;
        if(listGarant.length !== 0){
            listGarant = <div>
                <ul>
                    <li>InformationGarant</li>
                </ul>
            </div>
        }

        let modalClose2 = () => this.setState({showDeleteModal: false});

        console.log(this.state.tenantInfo);
        return (
            <div id="app_container">
                <Header/>
                <div id="content_wrapper">
                    <Nav/>
                    <div className="content-right-wrapper">
                        <div className="real_estate_view_header">
                            <div>
                                <Link to="/locataire" className="btn btn-default">
                                    <i className="glyphicon glyphicon-chevron-left"></i>
                                    Retour à la liste de locataires
                                </Link>
                            </div>
                            <div>
                                <Button>
                                    <i className="glyphicon glyphicon-edit"></i>
                                    Modification
                                </Button>
                                <Button onClick={ () => this.setState({showDeleteModal: true})} className="btn btn-danger">
                                    <i className="glyphicon glyphicon-trash"></i>
                                    Supprimer
                                </Button>
                            </div>
                        </div>

                        <div className="tenant_information_wrapper">
                            <div className="tenant_contact_information_wrapper">
                                <div className="tenant_contact_details_wrapper">
                                    <div className="tenant_information_header">
                                        <h4>Contact</h4>
                                    </div>
                                    <div className="tenant_contact_content">
                                        <h5>Locataire</h5>
                                        <ul>
                                            <li>Téléphone : {this.state.tenantInfo.mobile}</li>
                                            <li>Email : {this.state.tenantInfo.email}</li>
                                        </ul>
                                    </div>
                                    <hr/>
                                    <div className="tenant_contact_content">
                                        <h5>Garant</h5>
                                        <ul>
                                            <li>Téléphone : </li>
                                            <li>Email : </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="descriptif_document_wrapper">
                                    <div className="descriptif_document_header">
                                        <h4>Documents</h4>
                                    </div>
                                    <table className="descriptif_document_wrapper_table">
                                        <thead>
                                        <tr>
                                            <th>Nom du document</th>
                                            <th>Fichier</th>
                                        </tr>
                                        </thead>
                                        <tbody>
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
                            <div className="tenant_details_wrapper_wrapper">
                                <div className="tenant_details_wrapper">
                                    <div className="streamer_header">
                                    </div>
                                    <div className="tenant_details_content">
                                        <h4>Clara.S : Ma locataire préférée</h4>
                                        <div className="tenant_details_list_wrapper">
                                            <div>
                                                <ul>
                                                    <li>Nom : { this.state.tenantInfo.first_name }</li>
                                                    <li>Prénom: { this.state.tenantInfo.last_name }</li>
                                                    <li>Métier : { this.state.tenantInfo.work }</li>
                                                    <li>Statut : </li>
                                                    <li>Salaire { this.state.tenantInfo.salary }</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <ul>
                                                    <li>Début du contrat : {new Date(this.state.tenantInfo.contract_started).toLocaleDateString()} </li>
                                                    <li>Durée du contrat : {this.state.tenantInfo.contract_duration}</li>
                                                    <li>Fin de contrat : {new Date(this.state.tenantInfo.contract_end).toLocaleDateString()}</li>
                                                    <li> Type de contrat : {this.state.tenantInfo.contract_type}</li>
                                                    <li>Date de payement : {this.state.tenantInfo.payment_date}</li>
                                                </ul>
                                            </div>
                                            {listGarant}
                                        </div>
                                        <p>Commentaires : {this.state.tenantInfo.commentary}</p>
                                    </div>
                                </div>
                                <div className="tenant_table_wrapper">
                                    <h4>Liste des payements a effectué par le locataire</h4>
                                    <TenantPaymentTable data={this.state.tenantInfo.payment_list}/>
                                </div>
                            </div>
                        </div>
                        <Modal show={this.state.showDeleteModal} onHide={modalClose2}>
                            <Modal.Header closeButton>
                                <Modal.Title>Supprimer votre locataire</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p>Etes vous sur de vouloir le supprimer ?</p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={this.handleDelete} variant="secondary">Supprimer</Button>
                                <Button onClick={this.onHide} variant="primary">Fermer</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

export default TenantProfil;