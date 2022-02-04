export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(r => r.json())
}

export const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "content-Type": "application/json"
        },
        body: JSON.stringify(game)
    })
        .then(res => res.json())
}

export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(res => res.json())
}

export const updateGame = (game, id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`

        },
        body: JSON.stringify(game)
    })
        
}