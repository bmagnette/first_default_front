import React from 'react';
import {BACK_URL} from "../../../constants/index";
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import NotificationSystem from "react-notification-system";
import {Button, Modal, FormGroup, Label, FormControl, Checkbox} from "react-bootstrap";

class NewEventModal extends React.Component {
    constructor(props) {
        let m = moment().utcOffset(0);
        m.set({hour:0,minute:0,second:0,millisecond:0});

        super(props);
        this.state = {
            event_date: new Date(),
            name_event: "",
            description_event: "",
            location_event: "",
            hour_event: m,
            duration_event: m,
            isAllDay: false,
            event_type: ""
        };
    }

    handleChangeCalendar = (event_date) => {
        this.setState({
            event_date: event_date
        });
    };

    // componentDidMount() {
    //     this._notificationSystem = this.refs.notificationSystem;
    //     if (this.props.iseditable === 1) {
    //         this.setState({
    //             event_date: this.props.eventclicked.start_date,
    //             name_event: this.props.eventclicked.title,
    //             description_event: this.props.eventclicked.description,
    //             location_event: this.props.eventclicked.location,
    //             isAllDay: this.props.eventclicked.isAllDay,
    //             event_type : this.props.eventclicked.event_type
    //         })
    //     }
    // };

    _addNotification = (message, level) => {
        this._notificationSystem.addNotification({
            message: message,
            level: level
        })
    };

    onChangeHour = hour_event => {
        this.setState({hour_event: hour_event.format('HH:mm')});
    };

    onChangeMinute = (duration_event) => {
        this.setState({
            duration_event: duration_event.format('mm')
        });
    };

    handleSubmit = (event) => {
        if(this.state.isAllDay === true){
            let date = this.state.event_date;
            date.setDate(date.getDate() + 1 );
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            this.setState({event_date: date});
        }

        console.log(this.state);
        fetch(BACK_URL + 'calendar/create', {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('TOKEN'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                "name_event": this.state.name_event,
                "description_event": this.state.description_event,
                "location_event": this.state.location_event,
                "event_date": this.state.event_date,
                "hour_event": this.state.hour_event,
                "duration": this.state.duration_event,
                "isAllDay": this.state.isAllDay,
                "property_id": this.state.propertyid,
                "event_type": this.state.event_type
            })
        })
            .catch(error => {
                this._addNotification(error["message"], "error")
            })
            .then(function (response) {
                return response.json();
            })
            .then(response => {
                this._addNotification(response["message"], "success");
            });
        event.preventDefault();
        this.props.onHide();
    };

    handleChangeCheckBox = (event) => {
        this.setState({isAllDay: event.target.checked});
    };

    handleChange = (event) => {
        let field_name = event.target.name;
        let field_Val = event.target.value;
        this.setState({[field_name]: field_Val});
    };

    render() {
        let htmlHiden;
        if (this.state.isAllDay === true) {
            htmlHiden = <div></div>
        }
        else {
            htmlHiden = <div>
                <hr/>
                <div className="specific_date_form_wrapper">
                    <FormGroup className="daily_event_form">
                        <Label>Heure de rendez-vous</Label>
                        <br/>
                        <TimePicker
                            style={{width: 100}}
                            format="HH:mm"
                            defaultValue={this.state.hour_event}
                            className="xxx"
                            onChange={this.onChangeHour}
                            showSecond={false}
                        />
                    </FormGroup>
                    <FormGroup className="daily_event_form">
                        <Label>Durée</Label>
                        <br/>
                        <TimePicker
                            style={{width: 100}}
                            format="mm"
                            showHour={false}
                            showSecond={false}
                            defaultValue={this.state.duration_event}
                            className="yyy"
                            onChange={this.onChangeMinute}
                        />
                    </FormGroup>
                </div>
            </div>
        }
        return (
            <div>
                <div>
                    <NotificationSystem ref="notificationSystem"/>
                </div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered="true">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Ajouter un évènement
                        </Modal.Title>
                    </Modal.Header>
                    <form id="add_event_form">
                        <Modal.Body>
                            <FormGroup controlId="formValidationSuccess1">
                                <Label>Nom de l'évènement</Label>
                                <FormControl required type="text" name="name_event" onChange={this.handleChange}/>
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess3">
                                <Label>Description</Label>
                                <FormControl componentClass="textarea" name="description_event"
                                             onChange={this.handleChange}/>
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess1">
                                <Label>Lieux</Label>
                                <FormControl required type="text" name="location_event" onChange={this.handleChange}/>
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess3">
                                <Label>Type d'évènements</Label>
                                <br/>
                                <select defaultValue={this.state.event_type} onChange={this.handleChange} placeholder="Type d'évènements">
                                    <option key={"option_" + "Travaux"} value="Travaux" name={"Travaux"}>Travaux</option>
                                    <option key={"option_" + "Visite"} value="Visite" name={"Visite"}>Travaux</option>
                                    <option key={"option_" + "Notaire"} value="Notaire" name={"Notaire"}>Notaire</option>
                                </select>
                            </FormGroup>
                            <div className="daily_event_form_wrapper">
                                <FormGroup className="daily_event_form" controlId="formValidationSuccess1">
                                    <Label>Date</Label>
                                    <br/>
                                    <DatePicker selected={this.state.event_date} onChange={this.handleChangeCalendar}/>
                                    <FormControl.Feedback/>
                                </FormGroup>
                                <FormGroup className="daily_event_form" id="formGridCheckbox">
                                    <Label>Evènement d'une journée</Label>
                                    <Checkbox type="checkbox" value={this.state.isAllDay} checked={this.state.isAllDay}
                                              onChange={this.handleChangeCheckBox}/>
                                </FormGroup>
                            </div>
                            {htmlHiden}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button id="submit_modal" type="submit" size="sm"
                                    onClick={this.handleSubmit}>Ajouter</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default NewEventModal;