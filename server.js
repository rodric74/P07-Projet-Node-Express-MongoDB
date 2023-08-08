const http = require('http');
const app = require('./app')

const port = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(process.env.PORT || 4000);
