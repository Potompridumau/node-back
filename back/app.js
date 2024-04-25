const http = require('http');
const path = require("path");
const { voteRouteController, mainRouteController, gameRouteController } = require('./controllers/index');
const { staticFile, mimeTypes } = require('./appModules/http-utils/index');

const server = http.createServer(async (req, res) => {
    try {
        const url = req.url;
        switch (url) {
            case '/':
                res.statusCode = 200;
                await mainRouteController(res, '/index.html', '.html');
                break;
            case '/game':
                await gameRouteController(res);
                break;
            case '/vote':
                await voteRouteController(req, res);
                break;
            default:
                const extname = String(path.extname(url)).toLowerCase();
                if (extname in mimeTypes) {
                    res.setHeader("Content-Type", mimeTypes[extname]);
                    await staticFile(res, url, extname);
                } else {
                    res.statusCode = 404;
                    res.end('Not Found');
                }
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
});

server.listen(3005, () => console.log('server was worked on PORT 3005'));
