async function getData() {
    try{
        const response = await fetch('https://api-code-2.practicum-team.ru/games')
        const data = await response.json()
        return data
    }catch (e){
        console.log(e);
        throw(e)
    }
}

function getRandomGame(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }  
module.exports = {getData, getRandomGame}