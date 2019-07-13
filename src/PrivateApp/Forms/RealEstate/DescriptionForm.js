import React from 'react';
import '../../../public/css/PrivateApp/card.css';
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';


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
        this.props.nextStep("loan_form", "description_form_complete");
    };

    render() {
        const { values } = this.props;

        return (
            <div className="add_apartment_wrapper">
                <div className="description_form_wrapper">
                    <div className="description_form_wrapper_left">
                        <h4>Information d'achat</h4>
                        <FormGroup>
                            <ControlLabel>Montant à l'achat</ControlLabel>
                            <FormControl type="text" name="buildingValue" value={values.value} onChange={this.props.handleChange('value')} placeholder="100,000"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Prix du Notaire</ControlLabel>
                            <FormControl type="text" name="notaryFees" value={values.notary_fees} onChange={this.props.handleChange('notary_fees')} placeholder="8,000 environ 8%"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Frais d'agence</ControlLabel>
                            <FormControl type="text" name="agencyFees" value={values.agency_fees} onChange={this.props.handleChange('agency_fees')} placeholder="3,000"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Mobilier</ControlLabel>
                            <FormControl type="text" name="mobilier" value={values.mobilier} onChange={this.props.handleChange('mobilier')} placeholder="2,000"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Travaux</ControlLabel>
                            <FormControl type="text" name="work" value={values.work} onChange={this.props.handleChange('work')} placeholder="0 si sans travaux"/>
                        </FormGroup>
                    </div>
                    <div className="description_form_wrapper_right">
                        <div>
                            <h4>Description du bien</h4>
                            <div className="description_form_wrapper_formgroup">
                                <FormGroup className="float_form_size">
                                    <ControlLabel>Numéro de voirie</ControlLabel>
                                    <FormControl type="numeric" name="addressNumber" value={values.address_number} onChange={this.props.handleChange('address_number')} placeholder="6"/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Numérotation</ControlLabel>
                                    <select className="select_form" name="addressExtension" value={values.address_extensions} onChange={this.props.handleChange('address_extensions')} placeholder="">
                                        <option value="normal">-</option>
                                        <option value="bis">Bis</option>
                                        <option value="ter">Ter</option>
                                        <option value="quater">Quater</option>
                                    </select>
                                </FormGroup>
                                <FormGroup className="text_form_size">
                                    <ControlLabel>Adresse</ControlLabel>
                                    <FormControl type="text" name="address" value={values.address} onChange={this.props.handleChange('address')} placeholder="avenue des champs Elysees"/>
                                </FormGroup>
                                <FormGroup className="text_form_size">
                                    <ControlLabel>Ville</ControlLabel>
                                    <FormControl type="text" name="city" value={values.city_name} onChange={this.props.handleChange('city_name')} placeholder="Hérouville-en-Véxin"/>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="description_form_wrapper_formgroup">
                            <FormGroup className="float_form_size">
                                <ControlLabel>Code postal</ControlLabel>
                                <FormControl type="text" name="zipCode" value={values.zip_code} onChange={this.props.handleChange('zip_code')} placeholder="95300"/>
                            </FormGroup>
                            <FormGroup className="float_form_size">
                                <ControlLabel>Surface</ControlLabel>
                                <FormControl type="numeric" name="surface" value={values.surface} onChange={this.props.handleChange('surface')} placeholder="6"/>
                            </FormGroup>
                            <FormGroup className="float_form_size">
                                <ControlLabel>Nombre de pièces</ControlLabel>
                                <FormControl type="numeric" name="nbRoom" value={values.nb_room} onChange={this.props.handleChange('nb_room')} placeholder="6"/>
                            </FormGroup>
                        </div>
                        <div>
                            <h4>Charges du bien</h4>
                            <div className="description_form_wrapper_charges">
                                <div className="description_form_wrapper_charges_part">
                                    <FormGroup className="float_form_size">
                                        <ControlLabel>Loyer HC</ControlLabel>
                                        <FormControl type="text" name="rent" value={values.rent_HC} onChange={this.props.handleChange('rent_HC')} placeholder="500.0"/>
                                    </FormGroup>
                                    <FormGroup className="float_form_size">
                                        <ControlLabel>Charges de location</ControlLabel>
                                        <FormControl type="text" name="rent" value={values.charge_rent} onChange={this.props.handleChange('charge_rent')} placeholder="50.0"/>
                                    </FormGroup>
                                    <FormGroup className="float_form_size">
                                        <ControlLabel>Taxe Foncière</ControlLabel>
                                        <FormControl type="text" name="landTax" value={values.charge_fonciere} onChange={this.props.handleChange('charge_fonciere')} placeholder="400.0"/>
                                    </FormGroup>
                                </div>
                                <div className="description_form_wrapper_charges_part">
                                    <FormGroup className="float_form_size">
                                        <ControlLabel>Assurance PNO</ControlLabel>
                                        <FormControl type="number" name="insurancePNO" value={values.pno_insurance} onChange={this.props.handleChange('pno_insurance')} placeholder="75.0"/>
                                    </FormGroup>
                                    <FormGroup className="float_form_size">
                                        <ControlLabel>Assurance Loyer impayé</ControlLabel>
                                        <FormControl type="number" name="insuranceGLI" value={values.gli_insurance} onChange={this.props.handleChange('gli_insurance')} placeholder="0.0"/>
                                    </FormGroup>
                                    <FormGroup className="float_form_size">
                                        <ControlLabel>Charges de copropriété</ControlLabel>
                                        <FormControl type="number" name="coproTax" value={values.copro_fees} onChange={this.props.handleChange('copro_fees')} placeholder="800.0"/>
                                    </FormGroup>
                                </div>
                                <div className="description_form_wrapper_charges_part">
                                    <FormGroup className="float_form_size">
                                        <ControlLabel>TEOM</ControlLabel>
                                        <FormControl type="text" name="teom" value={values.teom} onChange={this.props.handleChange('teom')} placeholder="300.0"/>
                                    </FormGroup>
                                    <FormGroup className="float_form_size">
                                        <ControlLabel>Taux de vacances</ControlLabel>
                                        <FormControl type="number" name="vacancyRate" value={values.vacancy_rate} min={0} max={1} step={0.01} onChange={this.props.handleChange('vacancy_rate')} placeholder="0.04 en pourcentage"/>
                                    </FormGroup>
                                    <FormGroup className="float_form_size">
                                        <ControlLabel>Taux de maintenances</ControlLabel>
                                        <FormControl type="number" name="maintenanceRate" value={values.maintenance_rate} min={0} max={1} step={0.01} onChange={this.props.handleChange('maintenance_rate')} placeholder="0.04 en pourcentage"/>
                                    </FormGroup>
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