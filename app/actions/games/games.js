import 'whatwg-fetch'

const newGame = (username) => 
    fetch('http://localhost:8000/games/new', {
        method: 'POST',
        //credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username
        })
    });


const turnCard = (gameId, cardId) => 
    fetch(`http://localhost:8000/games/turn/${gameId}/${cardId}`, {
        method: 'POST',
        //credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    });


const getResults = () => 
    fetch('http://localhost:8000/games/results', {
        method: 'GET',
        //credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
    });


const resetHighscore = () => 
    fetch('http://localhost:8000/games/reset-results', {
        method: 'POST',
        //credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
    });

export {
    newGame,
    turnCard,
    getResults,
    resetHighscore
}