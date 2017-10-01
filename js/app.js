'use strict';
$('body').prepend('<h3 id="winCounter"></h3>')
$('body').prepend('<h3>Win Counter</h3>')
$('body').prepend('<h1 id="headLine">Welcome To Beautiful HTML5 Game</h1>');
$(function() {
  $("#test").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      $(this).text("You swiped " + direction );  
    }
  });

var win = 0;
document.getElementById("winCounter").innerHTML = win;
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed =  ((Math.random()*100) + 100);//ensuring speed is above 100
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 320;
};

// Is called every time the player position is updated
Player.prototype.update = function() {

    // If the player reaches the water
    if (this.y < 20) {
    win++;
    document.getElementById('winCounter').innerHTML = win;
    this.reset();
}
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if(direction == 'left' && this.x > 0) {
        this.x -= 50;
    }
    if(direction == 'right' && this.x < 400) {
        this.x += 50;
    }
    if(direction == 'up' && this.y > 3) {
        this.y -= 50;
    }
    if(direction == 'down' && this.y < 400) {
        this.y += 50;
    }
};

// Is called when the player is reset to the starting point
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 320;
};

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += (this.speed * dt);
    }
    else {this.x = -this.speed;}

    // logic to reset game if collision occurs
    if(this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 100 && this.y + 40 > player.y) {
        win = 0;
        document.getElementById('winCounter').innerHTML = win;
        player.reset();
    }
};


// Now instantiate your objects.
var enemy1 = new Enemy(-80, 60);
var enemy2 = new Enemy(-200, 140);
var enemy3 = new Enemy(-300, 230);
var enemy4 = new Enemy(-320, 140);
var enemy5 = new Enemy(-450, 60);
var enemy6 = new Enemy(-800, 230);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
// Place the player object in a variable called player
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});