const express = require('express');
const socket = require('socket.io');

const app = express();

app.set('port', process.env.PORT || 4000);

const server = app.listen(app.get('port'), 'localhost', () => {
    const addr = server.address();
    console.log('Express started on %s:%s\nPress Ctrl-c to terminate', addr.address, addr.port);
});


app.use(express.static('public'));



const io = socket(server);

io.on('connection', (skt) => {
    console.log('Made socket connection to: ' + skt.id);

    skt.on('draw', (data) => {
        io.sockets.emit('draw', data);
    });

});
