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

import NewEventModal from '../../Forms/Events/NewEventModal';
import ModifyEventModal from "../../Forms/Events/ModifyEventModal";

class CalendarPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            modalShow2: false,
            modalIsEditable: false,
            events: [],
            eventclicked: false,
            eventclickedInfo: null
        }
    }


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


        this.setState({
            events: res_list
        });

    }

    onHide = () =>  {
        this.setState({modalShow2: false, eventclicked: false})
    };

    render() {
        let modalClose = () => this.setState({modalShow: false});

        let modifyEvent = <div></div>;
        if (this.state.eventclicked) {
            console.log(this.state);
            modifyEvent = <ModifyEventModal show={this.state.modalShow2} onHide={this.onHide} eventclickedinfo={this.state.eventclickedInfo}/>
        }

        return (
            <div id="app_container">
                <Header/>
                <div id="content_wrapper">
                    <Nav/>
                    <div id="calendar_wrapper">
                        <NewEventModal show={this.state.modalShow} onHide={modalClose}/>
                        {modifyEvent}
                        <FullCalendar defaultView="dayGridMonth"
                                      plugins={[dayGridPlugin, timeGridPlugin, bootstrapPlugin, momentTimezonePlugin]}
                                      events={this.state.events} height="parent" width="parent" themeSystem="bootstrap"
                                      locale="fr" timeZone="Europe/Paris"
                                      header={{
                                          left: 'add_event',
                                          center: 'title',
                                          right: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek'}}
                                      eventClick={function (info) {
                                          const user = JSON.parse(localStorage.getItem('USER'));
                                          for (let event in user["events_calendar"]){
                                              if(user["events_calendar"][event]["id"].toString() === info.event.id){
                                                  this.setState({
                                                      eventclickedInfo: {
                                                          "id": user["events_calendar"][event]["id"],
                                                          "title": user["events_calendar"][event]["name_event"],
                                                          "description": user["events_calendar"][event]["description"],
                                                          "start_date": user["events_calendar"][event]["start_date"],
                                                          "end_date": user["events_calendar"][event]["end_date"],
                                                          "hour": user["events_calendar"][event]["hour"],
                                                          "duration": user["events_calendar"][event]["duration"],
                                                          "location": user["events_calendar"][event]["location"],
                                                          "isAllDay": user["events_calendar"][event]["isAllDay"].toString()
                                                      },
                                                      modalShow2: true,
                                                      eventclicked: true,
                                                  });
                                              }}}.bind(this)}
                                      footer={{
                                          left: '',
                                          center: '',
                                          right: 'prev,next'}}
                                      customButtons={{
                                          add_event: {
                                              text: 'Ajouter un évènement',
                                              click: function () {
                                                  this.setState({modalShow: true})}.bind(this)}}}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


export default CalendarPage;