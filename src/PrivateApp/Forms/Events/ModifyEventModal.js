import React from 'react';
import {BACK_URL} from "../../../constants/index";
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import NotificationSystem from "react-notification-system";
import {Button, Checkbox, FormControl, FormGroup, Label, Modal} from "react-bootstrap";

class ModifyEventModal extends React.Component {
    constructor(props) {
        let m = moment().utcOffset(0);
        m.set({hour:0,minute:0,second:0,millisecond:0});

        super(props);
        this.state = {
            id: null,
            start_date: new Date(),
            end_date: null,
            title: "",
            description: "",
            location: "",
            hour_event: m,
            duration_event: m,
            allDay: true,
            event_type: ""
        };
    }

    handleChangeCalendar = (event_date) => {
        this.setState({
            start_date: event_date
        });
    };

    componentDidMount() {

        let startDate = new Date(this.props.eventclickedinfo.start_date);
        let endDate = new Date(this.props.eventclickedinfo.end_date);

        this._notificationSystem = this.refs.notificationSystem;
        let m = moment();
        m.set({hour:0,minute:this.props.eventclickedinfo.duration, second:0,millisecond:0});

        let m2 = moment(this.props.eventclickedinfo.hour);

        this.setState({
                id: this.props.eventclickedinfo.id,
                title: this.props.eventclickedinfo.title,
                description: this.props.eventclickedinfo.description,
                start_date: startDate,
                end_date: endDate,
                hour_event: m2,
                duration_event: m,
                location: this.props.eventclickedinfo.location,
                allDay: this.props.eventclickedinfo.isAllDay,
                event_type: this.props.eventclickedinfo.event_type
            });

        console.log(this.props.eventclickedinfo.isAllDay);
        };

    _addNotification = (message, level) => {
        this._notificationSystem.addNotification({
            message: message,
            level: level
        })
    };

    onChangeHour = hour => {
        this.setState({hour_event: hour.format('HH:mm')});
    };

    onChangeMinute = (duration) => {
        this.setState({
            duration_event: duration.format('mm')
        });
    };

    handleModification = (event) => {
        fetch(BACK_URL + 'calendar/update/' + this.state.id, {
            method: 'PUT',
            headers: {
                'Authorization': localStorage.getItem('TOKEN'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                "name_event": this.state.title,
                "description_event": this.state.description,
                "location_event": this.state.location,
                "event_date": this.state.start_date,
                "hour_event": this.state.hour_event,
                "duration": this.state.duration_event,
                "isAllDay": this.state.allDay,
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

    handleDelete = (event) => {
        fetch(BACK_URL + 'calendar/delete/' + this.state.id, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('TOKEN'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }})
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
        this.setState({allDay: event.target.checked});
    };

    handleChange = (event) => {
        let field_name = event.target.name;
        let field_Val = event.target.value;
        this.setState({[field_name]: field_Val});
    };

    render() {
        let htmlHiden;
        if (this.state.allDay === true) {
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
                            Mofifier un évènement
                        </Modal.Title>
                    </Modal.Header>
                    <form id="add_event_form">
                        <Modal.Body>
                            <FormGroup controlId="formValidationSuccess1">
                                <Label>Nom de l'évènement</Label>
                                <FormControl required type="text" name="name_event" defaultValue={this.state.title} onChange={this.handleChange}/>
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess3">
                                <Label>Description</Label>
                                <FormControl componentClass="textarea" name="description_event" defaultValue={this.state.description}
                                             onChange={this.handleChange}/>
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess1">
                                <Label>Lieux</Label>
                                <FormControl required type="text" name="location_event" defaultValue={this.state.location} onChange={this.handleChange}/>
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
                                    <DatePicker selected={this.state.start_date} value={this.state.start_date.toLocaleDateString} onChange={this.handleChangeCalendar}/>
                                    <FormControl.Feedback/>
                                </FormGroup>
                                <FormGroup className="daily_event_form" id="formGridCheckbox">
                                    <Label>Evènement d'une journée</Label>
                                    <Checkbox type="checkbox" checked={this.state.allDay}
                                              onChange={this.handleChangeCheckBox}/>
                                </FormGroup>
                            </div>
                            {htmlHiden}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button id="submit_modal" type="submit" size="sm"
                                    onClick={this.handleModification}>Modifier</Button>
                            <Button id="delete_modal" type="submit" size="sm"
                                    onClick={this.handleDelete}>Supprimer</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default ModifyEventModal;