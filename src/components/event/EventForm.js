import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getGames } from "../game/GameManager";
import { createEvent } from "./EventManager";

export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const description = useRef(null)
    const date = useRef(null)
    const time = useRef(null)
    const game = useRef(null)

    useEffect(() => {
        getGames().then(setGames)
    }, [])

    const newEvent = () => {
        createEvent({
            description: description.current.value,
            date: date.current.value,
            time: time.current.value,
            game: parseInt(game.current.value)
        })
        .then(
            () => history.push("/events")
        )
    }

    return (
        <>
            <form className="gameForm">
                <h2 className="gameForm__title">Register New Event</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Event Description: </label>
                        <input type="text" name="description" ref={description} required autoFocus className="form-control"
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Date: </label>
                        <input type="text" name="description" ref={date} required autoFocus className="form-control"
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Time: </label>
                        <input type="text" name="description" ref={time} required autoFocus className="form-control"
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Game: </label>
                        <select type="text" name="game_id" ref={game} required autoFocus className="form-control">
                        <option>Select a game</option>
                        {
                            games.map(game => {
                                return <option value={game.id}>{game.title}</option>
                            })
                        }
                    </select>
                    </div>



                </fieldset>

                {/* TODO: create the rest of the input fields */}

                <button type="submit"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()
                        // Send POST request to your API
                        newEvent()
                    }}
                    className="btn btn-primary">Create</button>
            </form>

        </>
    )
}