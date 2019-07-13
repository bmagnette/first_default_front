import React from 'react';
import Nav from '../../Components/Common/Nav';
import Header from '../../Components/Common/Header';
import '../../../public/css/PrivateApp/card.css';
import AddRealEstateForm from "../../Forms/RealEstate/MainForm";

const SimulatorRealEstate = () => {
    return (
        <div id="app_container">
            <Header/>
            <div id="content_wrapper">
                <Nav/>
                <div className="content-right-wrapper">
                    <AddRealEstateForm title={<h4>Simuler un achat de bien</h4>}/>
                </div>
            </div>
        </div>
    )
};

export default SimulatorRealEstate;