import React from 'react';
import '../../../public/css/PrivateApp/card.css';
import { Button, ControlLabel} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Garage from "../../../public/img/garage.jpg";
import Apartment from "../../../public/img/apartment.jpg";
import Building from "../../../public/img/building.jpg";
import House from '../../../public/img/default_house.jpg';


class BuildingTypeForm extends React.Component {

    validatePartForm = () => {
        this.saveAndContinue();
    };

    saveAndContinue = () => {
        this.props.nextStep("situation_form", "buildingTypeFormComplete");
    };

    render() {
        const { values } = this.props;

        return (
            <div>
                <div className="add_apartment_wrapper">
                    <div className="situation_form_wrapper">
                        <div className="situation_form_proposition">
                            <h4>Appartement</h4>
                            <Link to="#"><img onClick={this.props.handleChange('isApartment')} width={300} height={200} src={Apartment} alt="Appartement"/></Link>
                            <div className="situation_form_slider">
                                <ControlLabel className="switch">
                                    <input type="checkbox" value={values.isApartment} checked={values.isApartment === true} onChange={(e) => this.props.handleChange('isApartment')}/>
                                    <span className="slider round"></span>
                                </ControlLabel>
                            </div>
                        </div>
                        <div className="situation_form_proposition">
                            <h4>Garage</h4>
                            <Link to="#"><img onClick={this.props.handleChange('isGarage')} width={300} height={200} src={Garage} alt="Logement meublé"/></Link>
                            <div className="situation_form_slider">
                                <ControlLabel className="switch">
                                    <input type="checkbox" value={values.isGarage} checked={values.isGarage === true} onChange={(e) => this.props.handleChange('isGarage')}/>
                                    <span className="slider round"></span>
                                </ControlLabel>
                            </div>
                        </div>
                    </div>
                    <div className="situation_form_wrapper">
                        <div className="situation_form_proposition">
                            <h4>Maison</h4>
                            <Link to="#"><img onClick={this.props.handleChange('isHouse')} width={300} height={200} src={House} alt="House"/></Link>
                            <div className="situation_form_slider">
                                <ControlLabel className="switch">
                                    <input type="checkbox" value={values.isHouse} checked={values.isHouse === true} onChange={(e) => this.props.handleChange('isHouse')}/>
                                    <span className="slider round"></span>
                                </ControlLabel>
                            </div>
                        </div>
                        <div className="situation_form_proposition">
                            <h4>Immeuble de rapport</h4>
                            <Link to="#"><img onClick={this.props.handleChange('isBuilding')} width={300} height={200} src={Building} alt="Building"/></Link>
                            <div className="situation_form_slider">
                                <ControlLabel className="switch">
                                    <input type="checkbox" value={values.isBuilding} checked={values.isBuilding === true} onChange={(e) => this.props.handleChange('isBuilding')}/>
                                    <span className="slider round"></span>
                                </ControlLabel>
                            </div>
                        </div>
                    </div>
                    <div className="situation_form_wrapper_button">
                        <Button onClick={this.validatePartForm}>Suivant</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default BuildingTypeForm;