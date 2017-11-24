const socket = io.connect('http://localhost:4000');
console.log(socket);
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let mousedown = false;
let mousePos = { x: 0, y: 0 };

canvas.width = 800;
canvas.height = 450;


canvas.addEventListener('mousedown', (evt) => {
    mousedown = true;
});

canvas.addEventListener('mouseup', (evt) => {
    mousedown = false;
});

canvas.addEventListener('mousemove', (evt) => {
    if (mousedown) {
        mousePos = getMousePos(evt);
        socket.emit('draw', mousePos);
    }
});

socket.on('draw', (data) => {
    ctx.fillStyle = 'red';
    ctx.fillRect(data.x, data.y, 5, 5);
});



ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, canvas.width, canvas.height);


function getMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

