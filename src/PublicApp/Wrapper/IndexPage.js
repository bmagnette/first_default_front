import React from 'react';
import Header from "../Components/Common/Header";
import Footer from "../Components/Common/Footer";
import {Button} from "react-bootstrap";
import ContactForm from "../Forms/contact_form";
import facebook_icon from "../../public/img/facebook-logo-in-circular-button-outlined-social-symbol.png";
import instagram_icon from "../../public/img/instagram.png";
import linkedin_icon from "../../public/img/social-linkedin-circular-button.png";
import {FRONT_URL} from "../../constants";
import '../../public/css/PrivateApp/offers_saas.css';
import hamburger_pic from "../../public/img/hamburgare-icon.png";
import {Link} from "react-router-dom";

class IndexPage extends React.Component{
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };

    handleScroll(event) {
        let myNav = document.getElementById('public_header_app');

        if (document.scrollingElement.scrollTop > 60) {//Toggle colors
            myNav.classList.add("colored-container");
            myNav.classList.remove("transparent-container");
        }
        else {//Toggle colors
            myNav.classList.add("transparent-container");
            myNav.classList.remove("colored-container");
        }
    };
    render(){
        const url = FRONT_URL + "susbcribe";
        return(
        <div className="index_page_wrapper">
            <Header isScrolling={true} isIndex={true} LogoRedirection="/"/>
            <div className="carousel_index">
                <div className="carousel_text">
                    <h3>First Text</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    <div className="buttons_wrapper">
                        <Button className="carousel_button" bsStyle="primary" href={url}>S'enregistrer</Button>
                        {/*<Button className="carousel_button" bsStyle="info" href="#contact_anchor">Nos services</Button>*/}
                    </div>
                </div>
            </div>
            <div className="service_explanation_wrapper">
                <div className="service_explanation_photo_wrapper">
                    <div className="service_explanation_photo service_explanation_photo_object_1">
                        <Link to="/services">
                            <div className="service_explanation_photo_title">
                                <h1>Nos services</h1>
                                <p>Without any time</p>
                            </div>
                        </Link>
                    </div>
                    <div className="service_explanation_photo service_explanation_photo_object_2">
                        <Link to="">
                            <div className="service_explanation_photo_title">
                                <h1>Etude de cas</h1>
                                <p>Sans danger pour vos informations</p>
                            </div>
                        </Link>
                    </div>

                    <div className="service_explanation_photo service_explanation_photo_object_3">
                        <Link to="/tarification">
                            <div className="service_explanation_photo_title">
                                <h1>Tarification</h1>
                                <p>Prévoi le futur.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="philosophy_wrapper">
                <img src={hamburger_pic} alt="philosophy"/>
                <div className="philosophy_text_wrapper">
                    <h2>L'histoire</h2>
                    <p>Primi igitur omnium statuuntur Epigonus et Eusebius ob nominum gentilitatem oppressi.
                        praediximus enim Montium sub ipso vivendi termino
                        his vocabulis appellatos fabricarum culpasse tribunos ut adminicula futurae molitioni pollicitos.</p>
                </div>
            </div>
            <div className="three_step_wrapper">
                <h2>Comment ça marche : Expliquer en trois étapes comment commencer.</h2>
                <div className="step_wrapper_content">
                    <div className="step_wrapper">
                        <div>
                        Première Etape
                        </div>
                    </div>
                    <div className="step_wrapper">
                        <div>
                            Première Etape
                        </div>
                    </div>
                    <div className="step_wrapper">
                        <div>
                            Première Etape
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact_wrapper">
                <ContactForm id="contact_anchor" />
                <a id="contact_anchor" dangerouslySetInnerHTML={{ __html: '' }}/>
                <div className="contact_information">
                    <div className="contact_category">
                        <span className="sub_header_information">Email</span>azerty@gmail.com
                    </div>
                    <div className="contact_category">
                        <span className="sub_header_information">Téléphone</span> +33 7 69 01 98 48
                    </div>
                    <div className="contact_category">
                        <span className="sub_header_information">Adress</span> 6 rue bourgeoise, 95300 Hérouville
                    </div>
                    <div className="contact_category">
                        <span className="sub_header_information">Social media</span>
                        <div className="contact_media">
                            <a href=""><img  alt="facebook icon" width={35} height={35} src={facebook_icon}/></a>
                            <a href=""><img alt="linkedin icon" width={35} height={35} src={linkedin_icon}/></a>
                            <a href=""><img alt="instagram icon" width={35} height={35} src={instagram_icon}/></a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        )}
}


export default IndexPage;