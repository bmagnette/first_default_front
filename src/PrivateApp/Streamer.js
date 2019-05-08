import React from 'react';
import '../public/css/PrivateApp/Streamer.css';


const Streamer = () => {
    return (
        <div id="streamer_wrapper">
            <div className="streamer_element">
                <h3>Actifs</h3>
                <i>100.000</i>
            </div>
            <div className="streamer_element">
                <h3>Passifs</h3>
                <i>100.000</i>
            </div>
            <div className="streamer_element">
                <h3>Endettement</h3>
                <i>100.000</i>
            </div>
            <div className="streamer_element">
                <h3>Liquidités</h3>
                <i>100.000</i>
            </div>
            <hr/>
        </div>
    )
};

export default Streamer