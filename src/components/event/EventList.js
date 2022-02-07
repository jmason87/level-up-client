import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min"
import { joinEvent, deleteEvent, getEvents, leaveEvent } from "./EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })

                }}
            >Register New Event</button>                    
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.description}</div>
                        <div className="event__players">{event.date} players needed</div>
                        <div className="event__skillLevel">Skill level is {event.time}</div>
                        {
                            event.joined ?
                            <button onClick={() => {leaveEvent(event.id).then(setEvents)}}>Leave Event</button>
                            :
                            <button onClick={() => {joinEvent(event.id).then(setEvents)}}>Join Event</button>
                        }
                        <Link to={`/events/update/${event.id}`}><button>Update</button></Link>
                        <button onClick={() => {deleteEvent(event.id).then(setEvents)}}>Delete</button>
                    </section>
                })
            }
        </article>
    )
}