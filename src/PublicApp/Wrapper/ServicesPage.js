import React from 'react';
import Header from "../Components/Common/Header";
import Footer from "../Components/Common/Footer";

class PricingPage extends React.Component{

    render(){
        return(
            <div>
                <Header isScrolling={false} isIndex={true} LogoRedirection="/"/>
                <div className="services_wrapper">
                    <div className="services_content_wrapper">
                        <h2>Je suis le titre de mon service</h2>
                    </div>
                </div>
                < Footer/>
            </div>
        )
    }
}


export default PricingPage;