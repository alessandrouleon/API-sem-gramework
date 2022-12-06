const http = require('http');
const handler = require('../src/handller/handllerRoutes');

const server = http.createServer(handler);


server.listen(3334, () => console.log(`server run in port 3334`));

process.on("uncaughtException", (err) =>
    console.log(`Server Error ${err}`)
);