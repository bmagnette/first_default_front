import React from 'react';
import Nav from '../../Components/Common/Nav';
import Header from '../../Components/Common/Header';
import {withRouter} from "react-router-dom";
import AddRealEstateForm from "./MainForm";
import '../../../public/css/PrivateApp/card.css';

class ModifyBuilding extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        let { data } = this.props.location;

        return (
            <div id="app_container">
                <Header/>
                <div id="content_wrapper">
                    <Nav/>
                    <div className="content-right-wrapper">
                        <AddRealEstateForm dataToModify={data} title={<h4>Modifier votre bien</h4>}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ModifyBuilding);