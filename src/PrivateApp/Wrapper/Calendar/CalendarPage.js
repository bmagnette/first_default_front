import React from 'react';
import Nav from '../../Components/Common/Nav';
import Header from '../../Components/Common/Header';
import '../../../public/css/PrivateApp/calendar.css';
import 'rc-time-picker/assets/index.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';

import EventModal from '../../Forms/Events/EventModal';
import moment from 'moment';
import {BACK_URL} from "../../../constants";


class CalendarPage extends React.Component {
    constructor(props) {
        let m = moment().utcOffset(0);
        m.set({hour:0,minute:0,second:0,millisecond:0});

        super(props);
        this.state = {
            modalShow: false,
            events: [],
            eventClicked: false,
            eventClickedInfo: {},

            event_date: new Date(),
            name_event: "",
            description_event: "",
            location_event: "",
            hour_event: m,
            duration_event: m,
            isAllDay: false,
            event_type: "sans"
        }
    }

    handleChangeCheckBox = (event) => {
        this.setState({isAllDay: event.target.checked});
    };

    handleChange = (event) => {
        let field_name = event.target.name;
        let field_Val = event.target.value;
        this.setState({[field_name]: field_Val});
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
            })
            .then(function (response) {
                return response.json();
            })
            .then(response => {
                this.setInitialState();
            });
        event.preventDefault();
        this.onHide();
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
                "title": this.state.title,
                "description": this.state.description,
                "location": this.state.location,
                "start_date": this.state.start_date,
                "hour": this.state.hour_event,
                "duration": this.state.duration_event,
                "all_day": this.state.isAllDay,
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
        this.onHide();
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
        this.onHide();
    };

    setInitialState = () => {
        let m = moment().utcOffset(0);
        m.set({hour:0,minute:0,second:0,millisecond:0});
        this.setState({
            event_date: new Date(),
            name_event: "",
            description_event: "",
            location_event: "",
            hour_event: m,
            duration_event: m,
            isAllDay: false,
            event_type: ""
        })
    };

    handleChangeCalendar = (event_date) => {
        this.setState({
            event_date: event_date
        });
    };

    onChangeHour = hour_event => {
        this.setState({hour_event: hour_event.format('HH:mm')});
    };

    onChangeMinute = (duration_event) => {
        this.setState({
            duration_event: duration_event.format('mm')
        });
    };

    handleChangeOption = (event) => {
        this.setState({event_type: event.target.value})
    };

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('USER'));

        let res_list = [];
        for (let myIndex in user["events_calendar"]) {
            let id = user["events_calendar"][myIndex]["id"];
            let start_date = user["events_calendar"][myIndex]["start_date"];
            let end_date = user["events_calendar"][myIndex]["end_date"];
            let is_all_day = user["events_calendar"][myIndex]["isAllDay"];
            let name_event = user["events_calendar"][myIndex]["name_event"];
            let res_dict = {"id": id, "title": name_event, "start": start_date, "end": end_date, "allDay": is_all_day};
            res_list.push(res_dict);
        }
        this.setState({events: res_list});
    }

    onHide = () => {
        this.setState({modalShow: false});
    };

    render() {

        const { eventClickedInfo, event_date, name_event, description_event, location_event, hour_event, duration_event, isAllDay, event_type } = this.state;
        const values = {eventClickedInfo, event_date, name_event, description_event, location_event, hour_event, duration_event, isAllDay, event_type };

        let conditionalModal = <div></div>
        if(this.state.eventClicked === true){
            conditionalModal = <EventModal title={"Modifier un évènement"} buttonTitle="Modifier" show={this.state.modalShow} onHide={this.onHide} handleSubmit={this.handleModification} handleDelete={this.handleDelete} eventInfo={values} handleChangeOption={this.handleChangeOption} handleChangeCheckBox={this.handleChangeCheckBox} handleChange={this.handleChange} onChangeMinute={this.onChangeMinute} onChangeHour={this.onChangeHour} handleChangeCalendar={this.handleChangeCalendar}/>
        }
        else{
            conditionalModal = <EventModal title={"Ajouter un évènement"} buttonTitle="Ajouter" show={this.state.modalShow} onHide={this.onHide} handleSubmit={this.handleSubmit} handleDelete={this.handleDelete} eventInfo={values} handleChangeOption={this.handleChangeOption} handleChangeCheckBox={this.handleChangeCheckBox} handleChange={this.handleChange} onChangeMinute={this.onChangeMinute} onChangeHour={this.onChangeHour} handleChangeCalendar={this.handleChangeCalendar}/>
        }
        return (
            <div id="app_container">
                <Header/>
                <div id="content_wrapper">
                    <Nav/>
                    <div id="calendar_wrapper">
                        {conditionalModal}

                        <FullCalendar defaultView="dayGridMonth"
                                      plugins={[dayGridPlugin, timeGridPlugin, bootstrapPlugin, momentTimezonePlugin]}
                                      events={this.state.events} height="parent" width="parent" themeSystem="bootstrap"
                                      locale="fr" timeZone="Europe/Paris"
                                      header={{
                                          left: 'add_event',
                                          center: 'title',
                                          right: 'dayGridMonth, timeGridWeek, timeGridDay'}}
                                      buttonText={{month: 'Mois', week: 'Semaine', day: 'Jour'}}
                                      eventClick={function (info) {
                                          const user = JSON.parse(localStorage.getItem('USER'));
                                          for (let event in user["events_calendar"]){
                                              if(user["events_calendar"][event]["id"].toString() === info.event.id){
                                                  let mHour = moment().utcOffset(0);
                                                  mHour.set({hour:user["events_calendar"][event]["hour"].slice(0,2),minute: user["events_calendar"][event]["hour"].slice(-2),second:0,millisecond:0});
                                                  let mMinute = moment().utcOffset(0);
                                                  mMinute.set({hour: 0,minute: user["events_calendar"][event]["duration"],second:0,millisecond:0});

                                                  this.setState({
                                                      event_date: new Date(user["events_calendar"][event]["start_date"]),
                                                      name_event: user["events_calendar"][event]["name_event"],
                                                      description_event: user["events_calendar"][event]["description"],
                                                      location_event: user["events_calendar"][event]["location"],
                                                      hour_event: mHour,
                                                      duration_event: mMinute,
                                                      isAllDay: user["events_calendar"][event]["isAllDay"],
                                                      event_type: user["events_calendar"][event]["event_type"],
                                                      id: user["events_calendar"][event]["id"],
                                                      modalShow: true,
                                                      eventClicked: true,
                                                  });
                                                  }}}.bind(this)}
                                      footer={{
                                          left: '',
                                          center: '',
                                          right: 'prev,next'}}
                                      customButtons={{
                                          add_event: {
                                              text: 'Ajouter un évènement', click: function () {this.setState({modalShow: true, eventClicked: false})}.bind(this)}}}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


export default CalendarPage;