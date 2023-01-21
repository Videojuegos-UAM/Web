/* Pong game */
$(document).ready(function() {
var canvas = document.getElementById("pong");
var ctx = canvas.getContext("2d");
var w = 700;
var h = 700;
var started=false;
var moveUp = false;
var moveDown = false;
var paddleHeight = 100;
var paddleWidth = 20;
var paddle1Y = 250;
var paddle2Y = 250;
var ballX = 350;
var ballY = 350;
var ballSpeedX = 5;
var ballSpeedY = 5;
var player1Score = 0;
var computerScore = 0;
var winningScore = 10;
var showingWinScreen = true;

function handleMouseClick(evt) {
    if (showingWinScreen) {
        player1Score = 0;
        computerScore = 0;
        showingWinScreen = false;
    }
}

window.onload = function() {
    canvas.addEventListener('mousedown', handleMouseClick);
}

function ballReset() {
    if (player1Score >= winningScore || computerScore >= winningScore) {
        showingWinScreen = true;
    }

    ballSpeedX = -ballSpeedX;
    ballX = w / 2;
    ballY = h / 2;
}

function computerMovement() {
    var paddle2YCenter = paddle2Y + (paddleHeight / 2);
    if (paddle2YCenter < ballY - 35) {
        paddle2Y += 6;
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y -= 6;
    }
}


//Lets add the keyboard controls now

$(document).keydown(function(e) {
    var key = e.which;
    if (key == "87") moveUp = true;
    else if (key == "83") moveDown = true;
});

$(document).keyup(function(e) {
    var key = e.which;
    if (key == "87") moveUp = false;
    else if (key == "83") moveDown = false;
});

function playerMovement() {
    if (moveUp) {
        paddle1Y -= 6;
    }
    if (moveDown) {
        paddle1Y += 6;
    }
}


    

function moveEverything() {
    if (showingWinScreen) {
        return;
    }

    computerMovement();
    playerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle1Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            computerScore++; // must be BEFORE ballReset()
            ballReset();
        }
    }
    if (ballX > w) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle2Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++; // must be BEFORE ballReset()
            ballReset();
        }
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > h) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawNet() {
    for (var i = 0; i < h; i += 40) {
        colorRect(w / 2 - 1, i, 2, 20, 'white');
    }
}

function drawEverything() {
    // next line blanks out the screen with black
    colorRect(0, 0, w, h, 'black');

    if (showingWinScreen) {
        ctx.fillStyle = 'white';
        ctx.font = "36px Arial";
        if (player1Score >= winningScore) {
            ctx.fillText("Ganaste!", 275, 200);
        } else if (computerScore >= winningScore) {
            ctx.fillText("Perdiste!", 275, 200);
        }
        ctx.fillStyle = 'white';
        ctx.font = "24px Arial";
        ctx.fillText("Click para continuar", 250, 500);
        return;
    }

    drawNet();

    // this is left player paddle
    colorRect(0, paddle1Y, paddleWidth, paddleHeight, 'white');

    // this is right computer paddle
    colorRect(w - paddleWidth, paddle2Y, paddleWidth, paddleHeight, 'white');

    // next line draws the ball
    colorCircle(ballX, ballY, 10, 'white');

    ctx.fillText(player1Score, 100, 100);
    ctx.fillText(computerScore, w - 100, 100);
}

function colorCircle(centerX, centerY, radius, drawColor) {
    ctx.fillStyle = drawColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    ctx.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
    ctx.fillStyle = drawColor;
    ctx.fillRect(leftX, topY, width, height);
}

setInterval(function() {
    moveEverything();
    drawEverything();
}, 1000 / 60);
});
