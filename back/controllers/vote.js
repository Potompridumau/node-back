const fs = require('fs').promises; // Импорт модуля fs для работы с файловой системой
const { parseBody } = require('../appModules/http-utils/index');
const {
	PATH_TO_RATING_FILE,
	WEIGHT,
	createRating,
	updateRating,
} = require('../appModules/rating/index');

async function voteRouteController(req, res) {
	if (req.method !== 'POST') {
		res.statusCode = 404;
		res.end('Not Found');
		return;
	}

	try {
		const body = await parseBody(req);
		// console.log('Body:', body); 
console.log(body);
	
		let data = null
		try {
			// data = JSON.parse(body); --------------------------------------------------------------------------------- в теории так☠️🥲
			data = body;
		} catch (e) {
			console.error('Error parsing JSON:', e);
			res.statusCode = 400; 
			res.end('Invalid JSON');
			return;
		}

		const rating = createRating(data, WEIGHT);
		const ratingFile = await fs.readFile(PATH_TO_RATING_FILE, 'utf8');
    console.log(ratingFile);
		const ratingArray = JSON.parse(ratingFile);
		const newRating = updateRating(ratingArray, data.id, rating);
		await fs.writeFile(PATH_TO_RATING_FILE, JSON.stringify(newRating));
		res.setHeader('Content-Type', 'application/json');
    console.log(newRating);
		res.end(JSON.stringify(newRating.sort((a, b) => b.rating - a.rating)));
	} catch (e) {
		console.error(e);
		res.statusCode = 500;
		res.end('Internal Server Error');
	}
}

module.exports = voteRouteController;
