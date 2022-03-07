import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../redux/actions/events';


export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    
    const deleteEvent = () => {
        dispatch( eventStartDelete() );
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ deleteEvent }
        >
            <i className="fas fa-trash"></i>
            <span> Borrar Evento </span>
        </button>
    )
}
