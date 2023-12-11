const { AceBaseServer } = require('acebase-server');
const dbname = 'crm';
//https not included because running locally
const server = new AceBaseServer(dbname, { host: 'localhost', port: 3000, authentication: {
    defaultAdminPassword: 'password'
}});
//serve stuff
server.on("ready", () => {
    console.log("SERVER ready");
});
server.router.get("/info/crm", (req, res) => {
    res.sendStatus(200);
});
server.router.get('/', (req, res) => {
    res.sendFile(__dirname+"/client/index.html");
});
server.router.get('/modules/*', (req, res) => {
    res.sendFile(__dirname+"/client/modules/"+req.params[0]);
});
server.router.get('/libs/*', (req, res) => {
    res.sendFile(__dirname+"/client/libs/"+req.params[0]);
});
server.router.get('/index.css', (req, res) => {
    res.sendFile(__dirname+"/client/index.css");
});
server.router.get('/iosevka.ttf', (req, res) => {
    res.sendFile(__dirname+"/client/iosevka.ttf");
});
server.router.get('/main.js', (req, res) => {
    res.sendFile(__dirname+"/client/main.js");
});
//addtional shutdown handler because acebase doesnt do it
process.on('SIGINT', () => {
    server.shutdown().then(() => {
        console.log("SERVER shutdown");
        process.exit();
    });
});