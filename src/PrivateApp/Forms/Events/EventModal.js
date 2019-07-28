import React from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import {Button, Modal, Form} from "react-bootstrap";

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
                    <Form.Group className="daily_event_form">
                        <Form.Label>Heure de rendez-vous</Form.Label>
                        <br/>
                        <TimePicker
                            style={{width: 100}}
                            format="HH:mm"
                            defaultValue={this.props.eventInfo.hour_event}
                            className="xxx"
                            onChange={this.props.onChangeHour}
                            showSecond={false}
                        />
                    </Form.Group>
                    <Form.Group className="daily_event_form">
                        <Form.Label>Durée</Form.Label>
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
                    </Form.Group>
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
                    centered="true"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Form id="add_event_form">
                        <Modal.Body>
                            <Form.Group controlId="formValidationSuccess1">
                                <Form.Label>Nom de l'évènement</Form.Label>
                                <Form.Control defaultValue={eventInfo.name_event}  required type="text" name="name_event" onChange={this.props.handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="formValidationSuccess3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control defaultValue={eventInfo.description_event} type="textarea" name="description_event" onChange={this.props.handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="formValidationSuccess1">
                                <Form.Label>Lieux</Form.Label>
                                <Form.Control defaultValue={eventInfo.location_event} required type="text" name="location_event" onChange={this.props.handleChange}/>
                            </Form.Group>
                            <div className="center_element">
                                <Form.Label>Type d'évènements</Form.Label>
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
                                <Form.Group className="daily_event_form" controlId="formValidationSuccess1">
                                    <Form.Label>Date</Form.Label><br/>
                                    <DatePicker selected={eventInfo.event_date} onChange={this.props.handleChangeCalendar}/>
                                </Form.Group>
                                <Form.Group className="daily_event_form" id="formGridCheckbox">
                                    <Form.Label>Evènement d'une journée</Form.Label>
                                    <Form.Check type="checkbox" value={eventInfo.isAllDay} checked={eventInfo.isAllDay} onChange={this.props.handleChangeCheckBox}/>
                                </Form.Group>
                            </div>
                            {htmlHiden}
                        </Modal.Body>
                        <Modal.Footer>
                            {conditionalButton}
                            <Button id="submit_modal" type="submit" size="sm" onClick={this.props.handleSubmit}>{this.props.buttonTitle}</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default EventModal;