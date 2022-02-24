import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { momentLocalizer, Calendar } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from "../ui/Navbar";
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../redux/actions/ui';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

moment.locale('es');

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const myEventsList = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add( 2, 'hours').toDate(),
    bgcolor: '#f56954',
    notes: 'Comprar torta',
    user:{
        _id: '123',
        name: 'Juan'
    }
    // borderColor: '#f56954'
    // allDay: true,
}];   

const CalendarScreen = () => {

    const dispatch = useDispatch();

    const [ lastView, setLastview ] = useState( localStorage.getItem('calendarView') || 'month' );


    const onDoubleClick = (e) => {
        // console.log(e);
        dispatch( uiOpenModal() );
    };

    const onSelectEvent = (e) => {
        // console.log(e);
    };

    const onSelectSlot = (e) => {
        console.log(e);
    }

    const onViewChange = (e) => {
        setLastview(e);
        localStorage.setItem('calendarView', e);
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        let style = {
            backgroundColor: '#367CF7',
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
                events={ myEventsList }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }
                // @ts-ignore
                view={ lastView }
                components={ { event: CalendarEvent } }
            />

            <CalendarModal />

        </div>
    )
};

export default CalendarScreen