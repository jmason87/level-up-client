import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getGames, getSingleGame, updateGame } from "./GameManager"



export const GameFormUpdate = () => {
    const [game, setGame] = useState({})

    const [newTitle, setNewTitle] = useState("")
    const [newMaker, setNewMaker] = useState("")
    const [newGameType, setNewGameType] = useState(0)
    const [newNumOfPlayers, setNewNumOfPlayers] = useState(0)
    const [newSkillLevel, setNewSkillLevel] = useState(0)


    const { gameId } = useParams()
    const parsedId = parseInt(gameId)
    const history = useHistory()


    useEffect(() => {
        getSingleGame(parsedId)
            .then((d) => {
                setGame(d)
            })
        },
        [parsedId]
    )

    useEffect(() => {
        setNewTitle(game.title)
        setNewMaker(game.maker)
        setNewNumOfPlayers(game.number_of_players)
        setNewSkillLevel(game.skill_level)
        setNewGameType(game.game_type)
    }, [game])

    const updateNewGame = () => {
        const updatedGame = {
            title: newTitle,
            maker: newMaker,
            game_type: newGameType,
            number_of_players: newNumOfPlayers,
            skill_level: newSkillLevel
        }
        updateGame(updatedGame, parsedId)
            .then(history.push("/"))
    }
    return (
        <>
            <form>
                <fieldset>
                    <div>
                        <label>Title: </label>
                        <input 
                            type="text"
                            placeholder="Title"
                            onChange={e => setNewTitle(e.target.value)}
                            required autoFocus
                            value={newTitle} />
                    </div>
                    <div>
                        <label>Maker: </label>
                        <input 
                            type="text"
                            onChange={e => setNewMaker(e.target.value)}
                            required autoFocus
                            value={newMaker} />
                    </div>
                    <div>
                        <label>Number of Players: </label>
                        <input 
                            type="text"
                            onChange={e => setNewNumOfPlayers(e.target.value)}
                            required autoFocus
                            value={newNumOfPlayers} />
                    </div>
                    <div>
                        <label>Skill Level: </label>
                        <input 
                            type="text"
                            onChange={e => setNewSkillLevel(e.target.value)}
                            required autoFocus
                            value={newSkillLevel} />
                    </div>
                    <div>
                        <label>Game Type: </label>
                        <input 
                            type="text"
                            onChange={e => setNewGameType(e.target.value)}
                            required autoFocus
                            value={newGameType} />
                    </div>

                </fieldset>
                <button onClick={updateNewGame}>Update</button>
            </form>
        </>
    )
}