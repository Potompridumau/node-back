const fs = require("fs").promises;
const { getRandomGame } = require('../appModules/api/index');
const config = require('../appModules/rating');

async function gameRouteController(res) {
 try {
    const ratingFile = await fs.readFile(config.PATH_TO_RATING_FILE, "utf8");
    const data = JSON.parse(ratingFile);
    const game = getRandomGame(data);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(game));
 } catch (err) {
    console.error("Error reading rating file or parsing JSON:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
 }
}

module.exports = gameRouteController;
