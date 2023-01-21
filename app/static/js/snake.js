/* Snake game */
$(document).ready(function() {
var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
var snakeSize = 20;
var w = 700;
var h = 700;
var score = 0;
var snake;
var food;
var d="d";
var keydown;
var started=false;

//Lets create the snake now

var snakeLength = 5;
function init()
{
    snake = [];
    for(var i = snakeLength-1; i>=0; i--)
    {
        //This will create a horizontal snake starting from the top left
        snake.push({x: i, y:0});
    }
}

//Lets create the food now

function createFood()
{
    food = {
        x: Math.round(Math.random()*(w-snakeSize)/snakeSize), 
        y: Math.round(Math.random()*(h-snakeSize)/snakeSize), 
    };
    //This will create a cell with x/y between 0-44
    //Because there are 45(450/10) positions accross the rows and columns
}

//Lets paint the snake now

function paint()
{
    //To avoid the snake trail we need to paint the BG on every frame
    //Lets paint the canvas now
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);

    //The movement code for the snake to come here.
    //The logic is simple
    //Pop out the tail cell and place it infront of the head cell
    var nx = snake[0].x;
    var ny = snake[0].y;
    //These were the position of the head cell.
    //We will increment it to get the new head position
    //Lets add proper direction based movement now

    if(d == "d") nx++;
    else if(d == "a") nx--;
    else if(d == "w") ny--;
    else if(d == "s") ny++;

    //Lets add the game over clauses now
    //This will restart the game if the snake hits the wall
    //Lets add the code for body collision
    //Now if the head of the snake bumps into its body, the game will restart
    if(nx == -1 || nx == w/snakeSize || ny == -1 || ny == h/snakeSize || check_collision(nx, ny, snake))
    {
        //restart game
        started=false;
        keydown = null;
        //Lets organize the code a bit now.
        return;
    }

    //Lets write the code to make the snake eat the food
    //The logic is simple
    //If the new head position matches with that of the food,
    //Create a new head instead of moving the tail
    if(nx == food.x && ny == food.y)
    {
        var tail = {x: nx, y: ny};
        score++;
        //Create new food
        createFood();
    }
    else
    {
        var tail = snake.pop(); //pops out the last cell
        tail.x = nx; tail.y = ny;
    }
    //The snake can now eat the food.
    snake.unshift(tail); //puts back the tail as the first cell

    for(var i = 0; i < snake.length; i++)
    {
        var c = snake[i];
        //Lets paint 10px wide cells
        paint_cell(c.x, c.y);
    }
}

//Lets first create a generic function to paint cells

function paint_cell(x, y, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
}

//Lets add the keyboard controls now

$(document).keydown(function(e){
    var key = e.which;
    //We will add another clause to prevent reverse gear
    //use w,a,s,d to move the snake
    if(key == "65" && d != "d") d = "a";
    else if(key == "87" && d != "s") d = "w";
    else if(key == "68" && d != "a") d = "d";
    else if(key == "83" && d != "w") d = "s";

    //The snake is now keyboard controllable

    keydown = key;
})

function check_collision(x, y, array)
{
    //This function will check if the provided x/y coordinates exist
    //in an array of cells or not
    for(var i = 0; i < array.length; i++)
    {
        if(array[i].x == x && array[i].y == y)
         return true;
    }
    return false;
}

//Lets add the score now

function drawScore()
{
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText("Score: " + score, 5, h-5);
}

//Lets add the function for drawing the snake now

function drawSnake()
{
    for(var i = 0; i < snake.length; i++)
    {
        if (i==0)
        {
            paint_cell(snake[i].x, snake[i].y,"green");
        }
        else
        {
            var c = snake[i];
            paint_cell(c.x, c.y,"black");
        }
    }
}

//Lets paint the food

function drawFood()
{
    paint_cell(food.x, food.y,"red");
}

//Lets move the snake now using a timer which will trigger the paint function
//every 60ms

createFood();

//create start screen

function startScreen()
{
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);

    ctx.fillStyle = "black";
    ctx.font = "60px Arial";
    ctx.fillText("Snake", (w/2)-100, h/2);
    ctx.fillText("Press w,a,s,d to start", (w/2)-275, (h/2)+100);
    /*Print score*/
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText("Score: " + score, 5, h-5);

}



function refresh()
{
    if (started == false) {
        startScreen();
        if (keydown == "87" || keydown == "65" || keydown == "83" || keydown == "68") {
            started=true;
            //Lets initialize the game
            init();


            //Lets display the score
            
            drawScore();
            
            //Lets draw the snake now
            
            drawSnake();
            
            //Lets paint the food
            
            drawFood();

            d="d";
            score=0;
        }
        return;
    }
    paint();
    drawScore();
    drawSnake();
    drawFood();
}






//Finally lets call the setInterval function to move the snake

setInterval(refresh, 60);

// Path: app\static\js\snake.js

});