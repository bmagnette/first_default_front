import React from 'react';
import '../../../public/css/PrivateApp/Streamer.css';


const TenantStreamer = (props) => {

    const user = JSON.parse(localStorage.getItem('USER'));
    let currentTenant = user["current_tenants"];

    return (
        <div className="streamer_parent_wrapper">
            <div className="streamer_header">
            </div>
            <div id="streamer_wrapper">
                <div className="streamer_element">
                    <h4>Nombre de locataires</h4>
                    <i>{currentTenant.length}</i>
                </div>
                <div className="streamer_element">
                    <h4>Prochaine sortie</h4>
                    <i>14/09/2019</i>
                </div>
                <div className="streamer_element">
                    <h4>Frais de gestions</h4>
                    <i>0</i>
                </div>
                <div className="streamer_element">
                    <h4>Vacances locatives</h4>
                    <i>0</i>
                </div>
                <div className="streamer_element">
                    <h4>Revenu brut mensuel</h4>
                    <i>0.0</i>
                </div>
            </div>
        </div>
    )
};

export default TenantStreamer;