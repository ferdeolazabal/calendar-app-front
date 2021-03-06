import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "react-modal";
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from "sweetalert2"; 
import { uiCloseModal } from "../../redux/actions/ui";
import { eventClearActiveEvent, eventStartUpdate, startAddNewEvent } from "../../redux/actions/events";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        },
    };
Modal.setAppElement('#root');


const dateNow = moment().minutes(0).seconds(0).add( 1, 'hours' );
const endDate = dateNow.clone().add( 1, 'hours' );

const initialEvent = {
    title: '',
    notes: '',
    start: dateNow.toDate(),
    end: endDate.toDate(),
}

export const CalendarModal = () => {

    const dispatch = useDispatch();
    // @ts-ignore
    const { modalOpen } = useSelector( state => state.ui );
    // @ts-ignore
    const { activeEvent } = useSelector( state => state.calendar );

    const [ startDate, setStartDate ] = useState( dateNow.toDate() );
    const [ EndDate, setEndDate ] = useState( endDate.toDate() );

    const [ formValues, setFormValues] = useState( initialEvent )
    const { title, notes, start, end } = formValues;

    useEffect(() => {
        activeEvent 
            ? setFormValues( activeEvent ) 
            : setFormValues( initialEvent );

    }, [ activeEvent, setFormValues ])
    

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    };

    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        setFormValues( initialEvent );
    };

    const handleStartDateModal = ( e ) => {
        setStartDate( e );
        setFormValues({
            ...formValues,
            start: e
        });
    };

    const handleEndDateModal = ( e ) => {
        setEndDate( e );
        setFormValues({
            ...formValues,
            end: e
        });
    };

    const handleSubmitForm = ( e ) => {
        e.preventDefault();

        if( start >= end ){
            return Swal.fire({
                title: 'Oops...',
                text: 'La fecha de finalizaci??n del evento debe ser posterior a la fecha de inicio!',
                icon: 'info',
            })
        }
        if( title.trim().length < 2 ){   
            return Swal.fire({
                title: 'Oops...',
                text: 'El t??tulo del evento debe tener al menos 2 caracteres!',
                icon: 'info',
            })
        };
        // update event
        if( activeEvent ){
            dispatch( eventStartUpdate( formValues ) );
        
        } else { // add new event
            dispatch( startAddNewEvent( formValues ) );
        };
        closeModal();
    };


    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={ 300 }
            className="modal"
            overlayClassName="modal-fondo"
        >

        <h1>{ (!activeEvent) ? 'Nuevo evento' : 'Editar evento' }</h1>
        <hr />
        <form 
            className="container"
            onSubmit={ handleSubmitForm }
        >
            <div className="form-group">
                <label>Fecha y hora inicio</label>
                <DateTimePicker 
                    onChange={ handleStartDateModal } 
                    value={ startDate } 
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label>Fecha y hora fin</label>
                <DateTimePicker 
                    onChange={ handleEndDateModal } 
                    value={ EndDate } 
                    className="form-control"
                    minDate={ startDate }
                />
            </div>
            <hr />

            <div className="form-group">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={ `form-control ${ title.length > 1 ? 'is-valid' : '' }`}
                    placeholder="T??tulo del evento"
                    name="title"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }

                />
                <small id="emailHelp" className="form-text text-muted">Una descripci??n corta</small>
            </div>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    // @ts-ignore
                    rows="5"
                    name="notes"
                    value={ notes }
                    onChange={ handleInputChange }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Informaci??n adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>

        </Modal>
    )
};
