import React from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import {Button, Modal, FormGroup, ControlLabel, FormControl, Checkbox} from "react-bootstrap";

class EventModal extends React.Component {

    render() {
        let htmlHiden;
        if (this.props.eventInfo.isAllDay === "true" || this.props.eventInfo.isAllDay === true) {
            htmlHiden = <div></div>
        }
        else {
            htmlHiden = <div>
                <hr/>
                <div className="specific_date_form_wrapper">
                    <FormGroup className="daily_event_form">
                        <ControlLabel>Heure de rendez-vous</ControlLabel>
                        <br/>
                        <TimePicker
                            style={{width: 100}}
                            format="HH:mm"
                            defaultValue={this.props.eventInfo.hour_event}
                            className="xxx"
                            onChange={this.props.onChangeHour}
                            showSecond={false}
                        />
                    </FormGroup>
                    <FormGroup className="daily_event_form">
                        <ControlLabel>Durée</ControlLabel>
                        <br/>
                        <TimePicker
                            style={{width: 100}}
                            format="mm"
                            showHour={false}
                            showSecond={false}
                            defaultValue={this.props.eventInfo.duration_event}
                            className="yyy"
                            onChange={this.props.onChangeMinute}
                        />
                    </FormGroup>
                </div>
            </div>
        }

        let conditionalButton = <div></div>
        if(this.props.buttonTitle === "Modifier"){
            conditionalButton = <Button id="delete_modal" type="submit" size="sm" onClick={this.props.handleDelete}>Supprimer</Button>
        }
        else{
            conditionalButton = <Button id="delete_modal" type="submit" size="sm" onClick={this.props.onHide}>Annuler</Button>
        }

        let { eventInfo } = this.props;

        return (
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered="true">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>
                    <form id="add_event_form">
                        <Modal.Body>
                            <FormGroup controlId="formValidationSuccess1">
                                <ControlLabel>Nom de l'évènement</ControlLabel>
                                <FormControl defaultValue={eventInfo.name_event}  required type="text" name="name_event" onChange={this.props.handleChange}/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess3">
                                <ControlLabel>Description</ControlLabel>
                                <FormControl defaultValue={eventInfo.description_event} type="textarea" name="description_event" onChange={this.props.handleChange}/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess1">
                                <ControlLabel>Lieux</ControlLabel>
                                <FormControl defaultValue={eventInfo.location_event} required type="text" name="location_event" onChange={this.props.handleChange}/>
                            </FormGroup>
                            <div className="center_element">
                                <ControlLabel>Type d'évènements</ControlLabel>
                                <br/>
                                <select defaultValue={eventInfo.event_type} onChange={this.props.handleChangeOption} placeholder="Type d'évènements">
                                    <option value="sans" name="sans">Sans catégorie</option>
                                    <option value="Travaux" name="Travaux">Travaux</option>
                                    <option value="Visite" name="Visite">Visite</option>
                                    <option value="Notaire" name="Notaire">Notaire</option>
                                </select>
                            </div>
                            <hr/>
                            <div className="daily_event_form_wrapper">
                                <FormGroup className="daily_event_form" controlId="formValidationSuccess1">
                                    <ControlLabel>Date</ControlLabel><br/>
                                    <DatePicker selected={eventInfo.event_date} onChange={this.props.handleChangeCalendar}/>
                                </FormGroup>
                                <FormGroup className="daily_event_form" id="formGridCheckbox">
                                    <ControlLabel>Evènement d'une journée</ControlLabel>
                                    <Checkbox type="checkbox" value={eventInfo.isAllDay} checked={eventInfo.isAllDay} onChange={this.props.handleChangeCheckBox}/>
                                </FormGroup>
                            </div>
                            {htmlHiden}
                        </Modal.Body>
                        <Modal.Footer>
                            {conditionalButton}
                            <Button id="submit_modal" type="submit" size="sm" onClick={this.props.handleSubmit}>{this.props.buttonTitle}</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default EventModal;