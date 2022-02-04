import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getGames } from "../game/GameManager"
import { getSingleEvent, updateEvent } from "./EventManager"

export const EventFormUpdate = () => {
    const [event, setEvent] = useState({})
    const [games, setGames] = useState([])

    const [newDescription, setNewDescription] = useState("")
    const [newDate, setNewDate] = useState("")
    const [newTime, setNewTime] = useState("")
    const [newGame, setNewGame] = useState("")

    const { eventId } = useParams()
    const parsedId = parseInt(eventId)
    const history = useHistory()

    useEffect(() => {
        getSingleEvent(parsedId)
            .then(d => {
                setEvent(d)
            })
    },
        [parsedId]
    )

    useEffect(() => {
        getGames().then(setGames)
    }, [])

    useEffect(() => {
        setNewDescription(event.description)
        setNewDate(event.date)
        setNewTime(event.time)
        setNewGame(event.game?.id)
    }, [event])

    const updateEditedEvent = () => {
        const updatedEvent = {
            description: newDescription,
            date: newDate,
            time: newTime,
            game: parseInt(newGame)
        }
        updateEvent(updatedEvent, parsedId)
            .then(history.push("/events"))
    }
    return (
        <>
            <h1>Event Form</h1>
            <form>
                <fieldset>
                    <div>
                        <label>Event Description: </label>
                        <input 
                            type="text"
                            onChange={e => setNewDescription(e.target.value)}
                            required autoFocus
                            value={newDescription}
                            />
                    </div>
                    <div>
                        <label>Date: </label>
                        <input 
                            type="text"
                            onChange={e => setNewDate(e.target.value)}
                            required autoFocus
                            value={newDate}
                            />
                    </div>
                    <div>
                        <label>Time: </label>
                        <input 
                            type="text"
                            onChange={e => setNewTime(e.target.value)}
                            required autoFocus
                            value={newTime}
                            />
                    </div>
                    <div>
                        <label>Game: </label>
                        <select name="game" onChange={e => setNewGame(e.target.value)}>
                            <option>Select a Game</option>
                            {
                                games.map(game => {
                                    if (event.game?.id === game.id) {
                                    return <option value={game.id} selected>{game.title}</option>
                                } else {
                                    return <option value={game.id}>{game.title}</option>
                                }
                                
                                })
                            }
                        </select>
                        {/* <input 
                            type="text"
                            onChange={e => setNewGame(e.target.value)}
                            required autoFocus
                            value={newGame}
                            /> */}
                    </div>
                </fieldset>
                <button onClick={updateEditedEvent}>Update</button>
            </form>
        </>
    )
}