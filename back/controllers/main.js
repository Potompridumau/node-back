const { staticFile } = require('../appModules/http-utils/index');
const { getData, endpoints } = require('../appModules/api');
const { PATH_TO_RATING_FILE, makeRatingFile } = require('../appModules/rating');

async function mainRouteController(res, publicUrl, extname) {
 if (!res || !publicUrl || !extname) {
    console.error('Required arguments are missing');
    res.statusCode = 500;
    res.end('Internal Server Error');
    return;
 }

 try {
    const data = await getData(endpoints.games);
    console.log(data);

    await makeRatingFile(PATH_TO_RATING_FILE, data);
    res.statusCode = 200;
    staticFile(res, publicUrl, extname);
 } catch (error) {
    console.error('Error in mainRouteController:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
 }
}

module.exports = mainRouteController;
