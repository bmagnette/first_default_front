import React from 'react';
import Nav from '../../Components/Common/Nav';
import Header from '../../Components/Common/Header';
import {withRouter} from "react-router-dom";
import AddRealEstateForm from "../../Forms/RealEstate/AddRealEstateForm";
import '../../../public/css/PrivateApp/card.css';

class AddRealEstate extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){

        return (
            <div id="app_container">
                <Header/>
                <div id="content_wrapper">
                    <Nav/>
                    <div className="content-right-wrapper">
                        <AddRealEstateForm/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddRealEstate);