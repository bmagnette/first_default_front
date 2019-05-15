import React from 'react';
import Nav from '../Components/Common/Nav';
import Header from '../Components/Common/Header';
import '../../public/css/PrivateApp/calendar.css';
import 'rc-time-picker/assets/index.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import {Button, Modal, Form, FormGroup, Label, FormControl, Checkbox} from "react-bootstrap";
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import {BACK_URL} from "../../constants";
import NotificationSystem from "react-notification-system";


class DashboardPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {modalShow: false, events: []}
    }


    componentDidMount(){
        const user = JSON.parse(localStorage.getItem('USER'));

        let res_list = [];
        for (let myIndex in user["events_calendar"]){

            let start_date = user["events_calendar"][myIndex]["start_date"];
            let end_date = user["events_calendar"][myIndex]["end_date"];
            let is_all_day = user["events_calendar"][myIndex]["isAllDay"];
            let name_event = user["events_calendar"][myIndex]["name_event"];
            let description = user["events_calendar"][myIndex]["description"];
            let location = user["events_calendar"][myIndex]["location"];

            let res_dict = {"title": name_event, "date": start_date};
            res_list.push(res_dict);
        }

        this.setState({
            events: res_list
        });

    }

    render(){
        let modalClose = () => this.setState({ modalShow: false });
    return (
        <div id="app_container">
            <Header />
            <div id="content_wrapper">
                <Nav />
                {/* dayGridMonth, timeGridWeek*/}
                <div id="calendar_wrapper">
                    <MyVerticallyCenteredModal
                        show={this.state.modalShow}
                        onHide={modalClose}
                    />
                    <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin, timeGridPlugin, bootstrapPlugin ]}
                                  events={this.state.events} height="parent" width="parent" themeSystem="bootstrap"
                                  locale="fr" timeZone="local"
                                  header={{
                                      left: 'add_event',
                                      center: 'title',
                                      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                                  }}
                                  eventClick={{
                                      function(info){
                                          alert(info.event.title);
                                      }
                                  }}
                                  footer={{
                                      left: '',
                                      center: '',
                                      right: 'prev,next'
                                  }}
                                  customButtons={{
                                      add_event: {
                                      text: 'Ajouter un évènement',
                                      click: function()  {
                                          this.setState({ modalShow: true });
                                      }.bind(this)
                                  }}}
                    />
                </div>
            </div>
        </div>
    )
    }

}

class MyVerticallyCenteredModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event_date: new Date(),
            name_event: "",
            description_event: "",
            location_event:"",
            hour_event: null,
            duration_event: null,
            isAllDay: true,

        };
    }

    handleChangeCalendar = (event_date) =>{
        this.setState({
            event_date: event_date
        });
    };

    componentDidMount () {
        this._notificationSystem = this.refs.notificationSystem;
    };

    _addNotification = (message, level) =>{
        this._notificationSystem.addNotification({
            message: message,
            level: level
        })};

    onChangeHour = hour_event => {
        console.log(hour_event.format('HH:mm'));
        this.setState({ hour_event: hour_event.format('HH:mm') });
    };

    onChangeMinute = (duration_event) => {
        console.log(duration_event.format('mm'));
        this.setState({
            duration_event: duration_event.format('mm')
        });
    };

    handleSubmit = (event) =>{
        fetch(BACK_URL + 'calendar/create', {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('TOKEN'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({
                "name_event": this.state.name_event,
                "description_event": this.state.description_event,
                "location_event": this.state.location_event,
                "event_date": this.state.event_date,
                "hour_event": this.state.hour_event,
                "duration": this.state.duration_event,
                "isAllDay": this.state.isAllDay
            })})
            .catch(error => {
                this._addNotification(error["message"], "error")
            })
            .then(function(response) { return response.json(); })
            .then(response => {
                this._addNotification(response["message"], "success");
            });
        event.preventDefault();
    };

    handleChangeCheckBox = (event) => {
        this.setState({ isAllDay: event.target.checked });
    };

    handleChange = (event) =>{
        let field_name = event.target.name;
        let field_Val = event.target.value;
        this.setState({[field_name]: field_Val});
    };

    render() {
        let htmlHiden;
        if(this.state.isAllDay === true){
            htmlHiden = <div></div>
        }
        else{
            htmlHiden = <div>
                <hr/>
                <div className="specific_date_form_wrapper">
                <FormGroup className="daily_event_form">
                    <Label>Heure de rendez-vous</Label>
                    <br/>
                    <TimePicker
                        style={{ width: 100 }}
                        format="HH:mm"
                        defaultValue={moment()}
                        className="xxx"
                        onChange={this.onChangeHour}
                        showSecond={false}
                    />
                </FormGroup>
                <FormGroup className="daily_event_form">
                    <Label>Durée</Label>
                    <br/>
                    <TimePicker
                        style={{ width: 100 }}
                        format="mm"
                        showHour={false}
                        showSecond={false}
                        defaultValue={moment()}
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
                    <NotificationSystem ref="notificationSystem" />
                </div>
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
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
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="formValidationSuccess3">
                            <Label>Description</Label>
                            <FormControl componentClass="textarea" name="description_event" onChange={this.handleChange}/>
                            <FormControl.Feedback/>
                        </FormGroup>
                        <FormGroup controlId="formValidationSuccess1">
                            <Label>Lieux</Label>
                            <FormControl required type="text" name="location_event" onChange={this.handleChange}/>
                            <FormControl.Feedback />
                        </FormGroup>
                        <div className="daily_event_form_wrapper">
                            <FormGroup className="daily_event_form" controlId="formValidationSuccess1">
                                <Label>Date</Label>
                                <br/>
                                <DatePicker selected={this.state.event_date} onChange={this.handleChangeCalendar}/>
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup className="daily_event_form" id="formGridCheckbox">
                                <Label>Evènement d'une journée</Label>
                                <Checkbox type="checkbox" checked={this.state.isAllDay}
                                          onChange={this.handleChangeCheckBox}/>
                            </FormGroup>
                        </div>
                    {htmlHiden}
                </Modal.Body>
                <Modal.Footer>
                    <Button id="submit_modal" type="submit" bsSize="large" onClick={this.handleSubmit}>Ajouter</Button>
                </Modal.Footer>
            </form>
    </Modal>
            </div>
        );
    }
}

export default DashboardPage;