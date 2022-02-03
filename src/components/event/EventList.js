import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.description}</div>
                        <div className="event__players">{event.date} players needed</div>
                        <div className="event__skillLevel">Skill level is {event.time}</div>
                    </section>
                })
            }
        </article>
    )
}