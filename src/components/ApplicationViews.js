import React from "react"
import { Route } from "react-router-dom"
import { EventList } from "./event/EventList.js"
import { GameForm } from "./game/GameForm.js"
import { GameList } from "./game/GameList.js"
import { EventForm } from "./event/EventForm.js"
import { GameFormUpdate } from "./game/GameFormUpdate.js"
import { EventFormUpdate } from "./event/EventFormUpdate.js"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>            
            <Route exact path="/games/update/:gameId(\d+)">
                <GameFormUpdate />
            </Route>            
            <Route exact path="/events/update/:eventId(\d+)">
                <EventFormUpdate />
            </Route>            

        </main>
    </>
}