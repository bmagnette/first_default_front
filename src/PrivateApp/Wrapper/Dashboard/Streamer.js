import React from 'react';
import '../../../public/css/PrivateApp/Streamer.css';


const Streamer = (props) => {

    const {values} = props;


    return (
        <div className="streamer_parent_wrapper">
            <div className="streamer_header">
            </div>
            <div id="streamer_wrapper">
                <div className="streamer_element">
                    <h4>Actifs net</h4>
                    <i>{values["ACTIF_NET"]}</i>
                </div>
                <div className="streamer_element">
                    <h4>Passifs</h4>
                    <i>{values["PASSIF"]}</i>
                </div>
                <div className="streamer_element">
                    <h4>Endettement</h4>
                    <i>{values["DEBT_RATIO"]}</i>
                </div>
                <div className="streamer_element">
                    <h4>Liquidités</h4>
                    <i>{values["CASH_FLOW"]}</i>
                </div>
                <div className="streamer_element">
                    <h4>Imposition</h4>
                    <i>0.0</i>
                </div>
            </div>
        </div>
    )
};

export default Streamer