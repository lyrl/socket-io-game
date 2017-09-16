var players = {}

const gameSize = 1000; // 1000x100, will be downscaled to 500x500 when we draw

const playerSize = 50; // players are 50/50 squares (downscaled to 25x25)
const maxAccel = 5

function isValidPosition(newPosition, playerId) {
  // bounds check
  if (newPosition.x < 0 || newPosition.x + playerSize > gameSize) {
    return false
  }
  if (newPosition.y < 0 || newPosition.y + playerSize > gameSize) {
    return false
  }
  // collision check
  var hasCollided = false


  Object.keys(players).forEach((key) => {
    if (key == playerId) { return } // ignore current player in collision check
    player = players[key]
    // if the players overlap. hope this works
    if (Math.abs(player.x - newPosition.x) < playerSize && Math.abs(player.y - newPosition.y) < playerSize) {
      hasCollided = true
      return // don't bother checking other stuff
    }
  })
  if (hasCollided) { return false }
  return true
}

function movePlayer(id) {

  var player = players[id]

  var newPosition = {
    x: player.x + player.accel.x,
    y: player.y + player.accel.y
  }
  if (isValidPosition(newPosition, id)) {
    // move the player and increment score
    player.x = newPosition.x
    player.y = newPosition.y
  } else {
    // don't move the player
    // kill accel
    player.accel.x = 0
    player.accel.y = 0
  }
}

function accelPlayer(id, x, y) {
  var currentX = players[id].accel.x
  var currentY = players[id].accel.y

  if (currentX + x < maxAccel) {
    players[id].accel.x += x
  }
  if (currentY + y < maxAccel) {
    players[id].accel.y += y
  }
}

// thanks SO
function stringToColour(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

if (!this.navigator) { // super hacky thing to determine whether this is a node module or inlined via script tag
  module.exports = {
    players: players,
    stringToColour: stringToColour,
    accelPlayer: accelPlayer,
    movePlayer: movePlayer,
    playerSize: playerSize
  }
}
