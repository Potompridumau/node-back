const path = require("path");
const { staticFile, mimeTypes } = require('../appModules/http-utils/index');

async function defaultRouteController(res, url) {
 if (!res || !url) {
    console.error('Required arguments are missing');
    res.statusCode = 500;
    res.end('Internal Server Error');
    return;
 }

 const extname = String(path.extname(url)).toLowerCase();
 if (extname in mimeTypes) {
    try {
      await staticFile(res, url, extname);
    } catch (error) {
      console.error('Error serving static file:', error);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
 } else {
    res.statusCode = 404;
    res.end("Not Found");
 }
}

module.exports = defaultRouteController;
