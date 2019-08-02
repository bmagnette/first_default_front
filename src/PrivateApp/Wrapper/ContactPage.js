import React from 'react';
import Nav from '../Components/Common/Nav';
import Header from '../Components/Common/Header';
import '../../public/css/PrivateApp/contactPage.css';
import ContactForm from "../Forms/Contact/ContactForm";


const ContactPage = () => {
    return (
        <div id="app_container">
            <Header/>
            <div id="content_wrapper">
                <Nav/>
                <div className="content-right-wrapper">
                    <div className="contact_form_title">
                        <h2>Application NAME support</h2>
                        <p>Nous sommes là pour répondre à vos questions.</p>
                    </div>
                    <ContactForm/>
                </div>
            </div>
        </div>
    )
};

export default ContactPage;