/*
 * This demo use an external library for tweens : https://github.com/tweenjs/tween.js/
 */

/*
 * Import TIGL manager
 */
const TIGLManager = require("tiglmanager");


/*
 * Import Tween module (https://github.com/tweenjs/tween.js/)
 */
const Tween = require("tween.cjs");

/*
 * Some globals vars
 */
var tm;
var gameStage;
var gameStageStartTime = 0;
var gameSpeed = 0.15; // 0.1 units/ms => 100 units/second
var frameTime = 0;
var lastFrameTime = 0;
var fingerPressed = false;
var width = 0;
var height = 0;
var ground;
var ready;
var gameover;
var bird;
var gravity = 500; //gravity in unit/s²
var groundHeight = 128;

var pipesUp = new Array();
var pipesDown = new Array();
var lastPipeCreateTime = 0;


/*
 * Init must be declared as an attribute of the Alloy tag TIGLView (eg: onInit="init")
 */
function init()
{
    /*
     * Create and initialise TIGL manager
     */
    tm = new TIGLManager(this);

    /*
     * Load Sky
     */
    tm.addSprite({url: "Resources/flappyBird/sky.jpg", width: 2000, height: 2000, tile: true, layer: 0});
   
    /*
     * Load Ground
     */
    ground = tm.addSprite({url: "Resources/flappyBird/ground.png", width: 256*50, height: 256, tile: true, layer: 5});
    
    /*
     * Load Bird animation
     */
    bird = tm.addSprite({url: "Resources/flappyBird/bird.png", width: 100, height: 102, px: 55, py: 55, x: 100, y: 100, layer: 1});
    

    
    /*
     * Load gameover
     */
    gameover = tm.addSprite({url: "Resources/flappyBird/gameover.png", width: 518, height: 164, px: 259, py: 82, y: -500,layer: 10});

    
    /*
     * Load ready
     */
    ready = tm.addSprite({url: "Resources/flappyBird/ready.png", width: 500, height: 150, px: 250, py: 75, y: -500, layer: 10});

    /*
    * Wait resize at least once to start
    */
    waitToStart();

}

function waitToStart()
{
    if(width != 0 && height != 0)
    {
        setGameStage("starting");
        return;
    }
    setTimeout(waitToStart, 100);
}

/*
 * Resize must be declared as an attribute of the Alloy tag TIGLView (eg: onResize="resize")
 */ 
function resize(e)
{
    width = e.width;
    height = e.height;
    
    ground.y = height - groundHeight;
}

function setGameStage(newGameStage)
{
    switch(newGameStage)
    {
        case "starting":
            if(gameStage == "gameover")
            {
                gameover.x = width/2;
                gameover.y = -90;

                for(var n = 0; n < pipesUp.length; n++)
                {
                    pipesUp[n].remove();
                }
                pipesUp = new Array();
                
                for(var n = 0; n < pipesDown.length; n++)
                {
                    pipesDown[n].remove();
                }
                pipesDown = new Array();
            }

            ready.x = width/2;
            ready.y = (height - groundHeight) / 2;
            new Tween.Tween(ready)
            .to({y: -90}, 1000)
            .easing(Tween.Easing.Elastic.In).delay(1500).start();

            bird.playAnimation({loop: 0, pingpong: true, duration: 600});

        break;

        case "running":
            
        break;

        case "gameover":
            bird.playAnimation({loop: 1, duration: 0});
            new Tween.Tween(bird)
                        .to({y: bird.y - 200}, 500)
                        .easing(Tween.Easing.Quadratic.Out).chain(new Tween.Tween(bird)
                        .to({y: ground.y}, 500)
                        .easing(Tween.Easing.Quadratic.In)).start();

            gameover.x = width/2;
            gameover.y = -90;
            new Tween.Tween(gameover)
                        .to({x: width/2, y: (height - groundHeight)/2}, 1000)
                        .easing(Tween.Easing.Elastic.Out).delay(1000).start();
        break;
    }
    gameStage = newGameStage;
    gameStageStartTime = Date.now();
}

/*
 * Loop must be declared as an attribute of the Alloy tag TIGLView (eg: onLoop="loop")
 */ 
function loop()
{
    frameTime = Date.now();
    switch(gameStage)
    {
        case "starting" :
            moveWorld();
            bird.y = (height - groundHeight) * 0.5;
            bird.vy = 0;
            bird.acceleration = 0;
            if(gameStageDuration() > 3000)
            {
                setGameStage("running");
            }
        break;

        case "running" :
            moveWorld();
            moveBird();
            performCollisions();
            createPipes();
        break;

    }
    lastFrameTime = frameTime;
    Tween.update(); //Requiered for tween to work 
}

function moveBird()
{
    bird.acceleration = fingerPressed ? -2.0 * gravity : gravity;
    bird.vy += bird.acceleration * frameDuration();
    bird.vy *= 0.99;
    bird.y += bird.vy * frameDuration();
}

function moveWorld()
{
    ground.x = - (Date.now() * gameSpeed) % 256;
    ground.y = height - groundHeight;
    for(var n = 0; n < pipesUp.length; n++)
    {
        var pipe = pipesUp[n];
        pipe.x = width - (Date.now()- pipe.startTime) * gameSpeed;
    }
    
    for(var n = 0; n < pipesDown.length; n++)
    {
        var pipe = pipesDown[n];
        pipe.x = width - (Date.now()- pipe.startTime) * gameSpeed;
    }
}

function createPipes()
{
   if((Date.now() - lastPipeCreateTime) > 2000)
   {
        var topPostion = Math.random() * (height - groundHeight) / 2 + (height - groundHeight) / 2;
        var rand = Math.floor(Math.random() * 5);
        Ti.API.info("rand = " + rand);
        if(rand == 1 || rand == 2 || rand == 3)
        {
            Ti.API.info("pipe 1");
            var pipe = tm.addSprite({url: "Resources/flappyBird/pipe.png", width: 125, x: width, y: topPostion, px: 100});
            pipe.startTime = Date.now();
            pipesUp.push(pipe);
        }
        if(rand == 2 || rand == 3 || rand == 4)
        {
            Ti.API.info("pipe 2");
            var pipe = tm.addSprite({url: "Resources/flappyBird/pipe.png", width: 125, x: width, y: topPostion - 150, px: 100, sy: -1});
            pipe.startTime = Date.now();
            pipesDown.push(pipe);
        }
        lastPipeCreateTime = Date.now();
   }

}

function performCollisions()
{
    if(bird.y > ground.y - 25)
    {
        setGameStage("gameover");
    }

    for(var n = 0; n < pipesUp.length; n++)
    {
        var pipe = pipesUp[n];
        if(bird.x > pipe.x - 25 && bird.x<pipe.x + 150 && bird.y > pipe.y - 25)
        {
            setGameStage("gameover");
        }
    }

    
    for(var n = 0; n < pipesDown.length; n++)
    {
        var pipe = pipesDown[n];
        if(bird.x > pipe.x - 25 && bird.x<pipe.x + 150 && bird.y < pipe.y + 25)
        {
            setGameStage("gameover");
        }

    }
    
    for(var n = 0; n < pipesDown.length; n++)
    {
        var pipe = pipesDown[n];
        
    }
}

function frameDuration()
{
    if(lastFrameTime == 0)
    {
        return 0;
    }
    return (frameTime - lastFrameTime) * 0.001;
}

function gameStageDuration()
{
    return Date.now() - gameStageStartTime;
}


/*
 * Touch must be declared as an attribute of the Alloy tag TIGLView (eg: onTouch="touch")
 */ 
function touch(e)
{
   switch(e.action)
   {
       case "down" :
           fingerPressed = true;
        break;

        case "up" :
            fingerPressed = false;
            if(gameStage == "gameover" && gameStageDuration() > 2000)
            {
                setGameStage("starting");
            }
        break;
   }

}
