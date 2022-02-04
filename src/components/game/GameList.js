import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getGames, deleteGame } from "./GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const history = useHistory()
    const { gameId } = useParams()
    const parsedId = gameId

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [parsedId])

    const deleteTheGame = (id) => {
        deleteGame(id)
        .then(getGames().then(setGames))
    }

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })

                }}
            >Register New Game</button>        
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <Link to={`/games/update/${game.id}`}><button>Update</button></Link>
                        <button onClick={()=>{deleteGame(parseInt(game.id))}}>Delete</button>
                    </section>
                })
            }
        </article>
    )
}