import React from 'react';
import '../../../public/css/PrivateApp/Streamer.css';


const TenantStreamer = (props) => {

    const {values} = props;

    return (
        <div className="streamer_parent_wrapper">
            <div className="streamer_header">
            </div>
            <div id="streamer_wrapper">
                <div className="streamer_element">
                    <h4>Nombre de locataires</h4>
                    <i>0</i>
                </div>
                <div className="streamer_element">
                    <h4>Prochaine sortie</h4>
                    <i>14/09/2019</i>
                </div>
                <div className="streamer_element">
                    <h4>Frais déduits</h4>
                    <i>0</i>
                </div>
                <div className="streamer_element">
                    <h4>Vacances locatives</h4>
                    <i>0</i>
                </div>
                <div className="streamer_element">
                    <h4>Imposition</h4>
                    <i>0.0</i>
                </div>
            </div>
        </div>
    )
};

export default TenantStreamer;