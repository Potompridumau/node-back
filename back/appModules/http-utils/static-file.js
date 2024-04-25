const fs = require("fs").promises;
const path = require("path");
const mimeTypes = require('./mime-types');

async function staticFile(res, filePath, ext) {
    const fullPath = path.join("./public", filePath);

    try {
        await fs.access(fullPath);
        res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
        const data = await fs.readFile(fullPath);
        res.end(data);
    } catch (e) {
        console.error(e);
        res.statusCode = 404;
        res.end("Not Found");
    }
}

module.exports = staticFile;
