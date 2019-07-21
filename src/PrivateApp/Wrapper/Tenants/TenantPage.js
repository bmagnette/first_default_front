import React from 'react';
import Nav from '../../Components/Common/Nav';
import Header from '../../Components/Common/Header';
import '../../../public/css/PrivateApp/card.css';
import TenantTable from "../../Tables/TenantTable";
import TenantStreamer from "./TenantStreamer";


const TenantPage = () => {

    return (
        <div id="app_container">
            <Header/>
            <div id="content_wrapper">
                <Nav/>
                <div className="content-right-wrapper">
                    <TenantStreamer/>
                    <TenantTable/>
                </div>
            </div>
        </div>
    )
};

export default TenantPage;