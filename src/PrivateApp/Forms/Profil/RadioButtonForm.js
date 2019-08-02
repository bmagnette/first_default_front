import React from 'react';
import "../../../public/css/PublicApp/public_form.css"
import {BACK_URL} from "../../../constants";
import { ControlLabel } from "react-bootstrap";

class RadioButtonForm extends React.Component{
    constructor(props) {
        super(props);
        const user = JSON.parse(localStorage.getItem("USER"));
        const isNewsletterChecked = user["isNewsletter"];
        this.state = {
            isNewsletter: (isNewsletterChecked === 'true'),
            toogleValue: (isNewsletterChecked === 'false'),
        };
    }

    handleChangeToogle(){
        if(this.state.isNewsletter === true){
            this.setState({
                isNewsletter: false,
                toogleValue: true
            });
        }
        if(this.state.isNewsletter === false){
            this.setState({
                isNewsletter: true,
                toogleValue: false
            });
        }


        fetch(BACK_URL + 'user/newsletter', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem('TOKEN')},
            body: JSON.stringify({
                "isNewsletter": this.state.toogleValue,
            })})
            .catch(error => {
                console.log(error["message"]);
                this._addNotification(error["message"], "error")
            })
            .then(function(response) { return response.json(); })
            .then(response => {
                console.log(response["message"]);
                this._addNotification(response["message"], "success");
            });
    };

        render(){
            return(
                <ControlLabel className="switch">
                    <input type="checkbox" value={this.state.isNewsletter} checked={this.state.isNewsletter === true} onChange={(e) => this.handleChangeToogle()}/>
                    <span className="slider round"></span>
                </ControlLabel>
            )
        }
}

export default RadioButtonForm