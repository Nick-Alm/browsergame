var socket = io();
socket.on('message', function(data) {
  console.log(data);
});

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});

socket.emit('new player');
setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
//https://image.freepik.com/free-icon/small-house-with-chimney-silhouette_318-37815.jpg

socket.on('state', function(players) {
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'blue';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
    var img = new Image();
  img.onload = function() {
    context.drawImage(img, 0, 0);
    context.beginPath();
    context.moveTo(30, 96);
    context.lineTo(70, 66);
    context.lineTo(103, 76);
    context.lineTo(170, 15);
    context.stroke();
  };
  img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png';
});