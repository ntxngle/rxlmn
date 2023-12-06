const { AceBaseServer } = require('acebase-server');
const uwebsockets = require('uWebSockets.js');
const fs = require('fs');
const dbname = 'crm';
const server = new AceBaseServer(dbname, { host: 'localhost', port: 5757 });
server.on("ready", () => {
    console.log("SERVER ready");
});
uwebsockets.App().any('/*', (res, req) => {
    let p = req.getUrl();
    if(p === '/') p = '/index.html';
    if(fs.existsSync(`./client${p}`)) {
        let contentType = 'text/plain';
        if (p.endsWith('.html')) {
            contentType = 'text/html';
        }
        else if (p.endsWith('.js')) {
            contentType = 'application/javascript';
        }
        else if (p.endsWith('.css')) {
            contentType = 'text/css';
        }
        else if (p.endsWith('.png')) {
            contentType = 'image/png';
        }
        else if (p.endsWith('.jpg')) {
            contentType = 'image/jpeg';
        }
        else if (p.endsWith('.ico')) {
            contentType = 'image/x-icon';
        }
        res.writeHeader('Content-Type', contentType);
        res.end(fs.readFileSync(`./client${p}`));
    } else {
        res.end("huh !?!?!");
    }
}).listen(3000, (listenSocket) => {
    if (listenSocket) {
        console.log("is run 3000");
    }
    else {
        throw new Error('Failed to listen');
    }
});
process.on('SIGINT', () => {
    server.shutdown().then(() => {
        console.log("SERVER shutdown");
        process.exit();
    });
});