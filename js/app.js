'use strict';
$('body').append('<h1 id="headLine">HTML5 Game</h1>');
$('body').append('<h3>Win Counter</h3>');
$('body').append('<h3 id="winCounter"></h3>');
$('body').append('<h4 >If You are using a touchscreen device Please click <button id="touch">HERE</button> before starting</h4>');
var win = 0;
document.getElementById("winCounter").innerHTML = win;
//document.ontouchmove = function(event){
 //   event.preventDefault();
//}
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = ((Math.random() * 100) + 100); //ensuring speed is above 100
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//  own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
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
    if (direction == 'left' && this.x > 0) {
        this.x -= 50;
    }
    if (direction == 'right' && this.x < 400) {
        this.x += 50;
    }
    if (direction == 'up' && this.y > 3) {
        this.y -= 50;
    }
    if (direction == 'down' && this.y < 400) {
        this.y += 50;
    }
    var count = 0;
    var self = this;
    $("canvas").swipe({

        swipeLeft: function(event, direction, distance, duration, fingerCount) {
            if (self.x > 0) {
                self.x -= 50;
            }
        },
        swipeRight: function(event, direction, distance, duration, fingerCount) {
            if (self.x < 400) {
                self.x += 50;
            }
        },
        swipeUp: function(event, direction, distance, duration, fingerCount) {
            if (self.y > 3) {
                self.y -= 80;
            }
        },
        swipeDown: function(event, direction, distance, duration, fingerCount) {
            if (self.y < 400) {
                self.y += 80;
            }
        },

        threshold: 75
    });
};


// Is called when the player is reset to the starting point
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 320;
};

Enemy.prototype.update = function(dt) {
    // multiplied any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += (this.speed * dt);
    } else {
        this.x = -this.speed;
    }

    // logic to reset game if collision occurs
    if (this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 100 && this.y + 40 > player.y) {
        win = 0;
        document.getElementById('winCounter').innerHTML = win;
        player.reset();
    }
};



var enemy1 = new Enemy(-80, 60);
var enemy2 = new Enemy(-200, 140);
var enemy3 = new Enemy(-300, 230);
var enemy4 = new Enemy(-320, 140);
var enemy5 = new Enemy(-450, 60);
var enemy6 = new Enemy(-800, 230);


var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.getElementById("touch").addEventListener('click', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


document.addEventListener('touchmove', function(e) {

        e.preventDefault();

}, false);
