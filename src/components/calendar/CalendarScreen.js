import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { momentLocalizer, Calendar } from 'react-big-calendar';
import moment from 'moment';

import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../redux/actions/ui';
import { eventActiveEvent, eventClearActiveEvent, eventStartLoading } from '../../redux/actions/events';
import { Navbar } from "../ui/Navbar";
import { AddNewFab } from '../ui/AddNewFab';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment) // or globalizeLocalizer


const CalendarScreen = () => {

    const dispatch = useDispatch();
    // @ts-ignore
    const { events, activeEvent } = useSelector( state => state.calendar );
    // @ts-ignore
    const { uid } = useSelector( state => state.auth );
    const [ lastView, setLastview ] = useState( localStorage.getItem('calendarView') || 'month' );

    useEffect( () => {
        dispatch( eventStartLoading() );

    }, [ dispatch ] );

    const onDoubleClick = (e) => {
        dispatch( uiOpenModal() );
    };

    const onSelectEvent = (e) => {
        dispatch( eventActiveEvent(e))
    };

    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() );
        // console.log(e);
    }

    const onViewChange = (e) => {
        setLastview(e);
        localStorage.setItem('calendarView', e);
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        // console.log(event);
        
        let style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
            border: '0px',
        };
        return {style};
    };

    return (
        <div className="calendar-screen">
            <Navbar/>

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                // @ts-ignore
                view={ lastView }
                components={ { event: CalendarEvent } }
            />

            <CalendarModal />
            
            <AddNewFab />

            { activeEvent && <DeleteEventFab /> }

        </div>
    )
};

export default CalendarScreen