import { useState } from "react";
import Modal from "react-modal";
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from "sweetalert2"; 


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

export const CalendarModal = () => {

    // const [ isOpen, setIsOpen ] = useState( true );
    const [ startDate, setStartDate ] = useState( dateNow.toDate() );
    const [ EndDate, setEndDate ] = useState( endDate.toDate() );
    const [ titleValidate, setTitleValidate] = useState(true)

    const [ formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: dateNow.toDate(),
        end: endDate.toDate(),
    })

    const { title, notes, start, end } = formValues;

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    };

    const closeModal = () => {
        console.log('closeModal...')
        // setIsOpen( false );
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
        // console.log(formValues);

        if( start >= end ){
            return Swal.fire({
                title: 'Oops...',
                text: 'La fecha de finalización del evento debe ser posterior a la fecha de inicio!',
                icon: 'info',
            })
        }
        if( title.trim().length < 2 ){   
            return Swal.fire({
                title: 'Oops...',
                text: 'El título del evento debe tener al menos 2 caracteres!',
                icon: 'info',
            })
        }
    };


    return (
        <Modal
            isOpen={ true }
            // onAfterOpen={afterOpenModal}
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={ 300 }
            className="modal"
            overlayClassName="modal-fondo"
        >

        <h1> Nuevo evento </h1>
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
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }

                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
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
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
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
