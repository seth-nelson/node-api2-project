// Used to create and export an express application with its middleware/handlers/endpoints

const express = require('express');
const server = express();
const postRouter = require('./posts/posts-router');

server.use(express.json());
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
    res.send(`<h1>API is up and running</h1>`);
});

module.exports = server;