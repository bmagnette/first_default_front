import React from 'react';
import '../../../public/css/PrivateApp/card.css';
import { Button, Form } from 'react-bootstrap';


class DescriptionForm extends React.Component {

    validatePartForm = () => {
        this.saveAndContinue();
    };

    unValidateForm = () => {
        console.log(this.props.values.building_type);
        if(this.props.values.building_type === "isHouse"){
            this.props.nextStep("situation_form", "description_form_complete");
        }
        else{
            this.props.prevStep("fiscalite_form", "description_form_complete")
        }
    };

    saveAndContinue = () => {
        this.props.nextStep("inventary_form", "description_form_complete");
    };

    render() {
        const { values } = this.props;

        return (
            <div className="add_apartment_wrapper">
                <div className="description_form_wrapper">
                    <div className="description_form_wrapper_left">
                        <h4>Information d'achat</h4>
                        <Form.Group>
                            <Form.Label>Montant à l'achat</Form.Label>
                            <Form.Control type="text" name="buildingValue" value={values.value} onChange={this.props.handleChange('value')} placeholder="100,000"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Prix du Notaire</Form.Label>
                            <Form.Control type="text" name="notaryFees" value={values.notary_fees} onChange={this.props.handleChange('notary_fees')} placeholder="8,000 environ 8%"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Frais d'agence</Form.Label>
                            <Form.Control type="text" name="agencyFees" value={values.agency_fees} onChange={this.props.handleChange('agency_fees')} placeholder="3,000"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mobilier</Form.Label>
                            <Form.Control type="text" name="mobilier" value={values.mobilier} onChange={this.props.handleChange('mobilier')} placeholder="2,000"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Travaux</Form.Label>
                            <Form.Control type="text" name="work" value={values.work} onChange={this.props.handleChange('work')} placeholder="0 si sans travaux"/>
                        </Form.Group>
                    </div>
                    <div className="description_form_wrapper_right">
                        <div>
                            <h4>Description du bien</h4>
                            <div className="description_form_wrapper_Form.Group">
                                <Form.Group className="float_form_size">
                                    <Form.Label>Numéro de voirie</Form.Label>
                                    <Form.Control type="numeric" name="addressNumber" value={values.address_number} onChange={this.props.handleChange('address_number')} placeholder="6"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Numérotation</Form.Label>
                                    <select className="select_form" name="addressExtension" value={values.address_extensions} onChange={this.props.handleChange('address_extensions')} placeholder="">
                                        <option value="normal">-</option>
                                        <option value="bis">Bis</option>
                                        <option value="ter">Ter</option>
                                        <option value="quater">Quater</option>
                                    </select>
                                </Form.Group>
                                <Form.Group className="text_form_size">
                                    <Form.Label>Adresse</Form.Label>
                                    <Form.Control type="text" name="address" value={values.address} onChange={this.props.handleChange('address')} placeholder="avenue des champs Elysees"/>
                                </Form.Group>
                                <Form.Group className="text_form_size">
                                    <Form.Label>Ville</Form.Label>
                                    <Form.Control type="text" name="city" value={values.city_name} onChange={this.props.handleChange('city_name')} placeholder="Hérouville-en-Véxin"/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="description_form_wrapper_Form.Group">
                            <Form.Group className="float_form_size">
                                <Form.Label>Code postal</Form.Label>
                                <Form.Control type="text" name="zipCode" value={values.zip_code} onChange={this.props.handleChange('zip_code')} placeholder="95300"/>
                            </Form.Group>
                            <Form.Group className="float_form_size">
                                <Form.Label>Surface</Form.Label>
                                <Form.Control type="numeric" name="surface" value={values.surface} onChange={this.props.handleChange('surface')} placeholder="6"/>
                            </Form.Group>
                            <Form.Group className="float_form_size">
                                <Form.Label>Nombre de pièces</Form.Label>
                                <Form.Control type="numeric" name="nbRoom" value={values.nb_room} onChange={this.props.handleChange('nb_room')} placeholder="6"/>
                            </Form.Group>
                        </div>
                        <div>
                            <h4>Charges du bien</h4>
                            <div className="description_form_wrapper_charges">
                                <div className="description_form_wrapper_charges_part">
                                    <Form.Group className="float_form_size">
                                        <Form.Label>Loyer HC</Form.Label>
                                        <Form.Control type="text" name="rent" value={values.rent_HC} onChange={this.props.handleChange('rent_HC')} placeholder="500.0"/>
                                    </Form.Group>
                                    <Form.Group className="float_form_size">
                                        <Form.Label>Charges de location</Form.Label>
                                        <Form.Control type="text" name="rent" value={values.charge_rent} onChange={this.props.handleChange('charge_rent')} placeholder="50.0"/>
                                    </Form.Group>
                                    <Form.Group className="float_form_size">
                                        <Form.Label>Taxe Foncière</Form.Label>
                                        <Form.Control type="text" name="landTax" value={values.charge_fonciere} onChange={this.props.handleChange('charge_fonciere')} placeholder="400.0"/>
                                    </Form.Group>
                                </div>
                                <div className="description_form_wrapper_charges_part">
                                    <Form.Group className="float_form_size">
                                        <Form.Label>Assurance PNO</Form.Label>
                                        <Form.Control type="number" name="insurancePNO" value={values.pno_insurance} onChange={this.props.handleChange('pno_insurance')} placeholder="75.0"/>
                                    </Form.Group>
                                    <Form.Group className="float_form_size">
                                        <Form.Label>Assurance Loyer impayé</Form.Label>
                                        <Form.Control type="number" name="insuranceGLI" value={values.gli_insurance} onChange={this.props.handleChange('gli_insurance')} placeholder="0.0"/>
                                    </Form.Group>
                                    <Form.Group className="float_form_size">
                                        <Form.Label>Charges de copropriété</Form.Label>
                                        <Form.Control type="number" name="coproTax" value={values.copro_fees} onChange={this.props.handleChange('copro_fees')} placeholder="800.0"/>
                                    </Form.Group>
                                </div>
                                <div className="description_form_wrapper_charges_part">
                                    <Form.Group className="float_form_size">
                                        <Form.Label>TEOM</Form.Label>
                                        <Form.Control type="text" name="teom" value={values.teom} onChange={this.props.handleChange('teom')} placeholder="300.0"/>
                                    </Form.Group>
                                    <Form.Group className="float_form_size">
                                        <Form.Label>Taux de vacances</Form.Label>
                                        <Form.Control type="number" name="vacancyRate" value={values.vacancy_rate} min={0} max={1} step={0.01} onChange={this.props.handleChange('vacancy_rate')} placeholder="0.04 en pourcentage"/>
                                    </Form.Group>
                                    <Form.Group className="float_form_size">
                                        <Form.Label>Taux de maintenances</Form.Label>
                                        <Form.Control type="number" name="maintenanceRate" value={values.maintenance_rate} min={0} max={1} step={0.01} onChange={this.props.handleChange('maintenance_rate')} placeholder="0.04 en pourcentage"/>
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="situation_form_wrapper_button">
                    <Button onClick={this.unValidateForm}>Précédent</Button>
                    <Button onClick={this.validatePartForm}>Suivant</Button>
                </div>
            </div>
        )
    }
}

export default DescriptionForm;