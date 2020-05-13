// Used to create and start the server listening

const server = require('./server.js');

const PORT = 4000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});