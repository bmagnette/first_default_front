import React from 'react';
import "../../../public/css/PublicApp/Footer.css";
import {Link} from "react-router-dom";
import {APPLICATION_NAME} from "../../../constants";


const Footer = () => {
    return(
        <div className="footer_wrapper">
            <div className="footer_content_wrapper">
                <div className="page_list">
                    {/*<div className="column_base">*/}
                        {/*<Link to="/services">Nos services</Link>*/}
                    {/*</div>*/}
                    {/*<div className="column_base">*/}
                        {/*<Link to="/tarification">Tarification</Link>*/}
                    {/*</div>*/}
                     <div className="column_base">
                         <Link to="/#contact_anchor">Contact</Link>
                    </div>
                    {/*<div className="column_base">*/}
                        {/*<Link to="/signin">Presse</Link>*/}
                    {/*</div>*/}
                    {/*<div className="column_base">*/}
                        {/*<Link to="/signin">Réglementation</Link>*/}
                    {/*</div>*/}
                </div>
                <div className="copyright_element">
                    <p>Copyright 2019 : {APPLICATION_NAME}, all rights reserved</p>
                </div>
            </div>
        </div>
    )
};
export default Footer