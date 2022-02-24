import React from 'react'

export const CalendarEvent = ( { event } ) => {

    const { title, notes, user } = event;

    return (
        
        <div className="calendar-event">
            <strong>{ title }</strong>
            <strong> - { notes }</strong>
            <span> - { user.name }</span>
        </div>

    )
}
