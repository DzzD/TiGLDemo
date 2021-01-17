/*
 * Import TIGL manager
 */
const TIGLManager = require("tiglmanager");

/*
 * Import Pseudo Random generator
 */
const Random = require("random");


/*
 * Import Tween module (https://github.com/tweenjs/tween.js/)
 */
const Tween = require("tween.cjs");

/*
 * Some globals vars
 */
var tm;                         //TIGL Manager
var gameStage;                  //Current game stage
var gameStageStartTime = 0;     //Current game stage start time
var worldSpeed = 0.2;           //World speed units/ms => 200 units/second
var frameTime = 0;              //Current frame time (ms)
var lastFrameTime = 0;          //Last frame time (ms)
var width = 0;                  //View width
var height = 0;                 //View height
var ground;                     //Ground sprite
var ready;                      //Ready! sprite
var gameover;                   //Gameover sprite
var bird;                       //Bird sprite
var gravity = 1750;             //Gravity
var groundHeight = Alloy.isTablet ? 128 : 64;         //Ground height

var pipesUp = new Array();      //Pipes pointing up sprites
var pipesDown = new Array();    //Pipes pointing down sprites
var miscs = new Array();
var lastPipeCreateTime = 0;     //Last time game try of creating pipes


var random = new Random(0);

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
    tm.addSprite({url: "Resources/flappyBird/sky.png", width: 2000, height: 2000, tile: true, layer: 0});
   
    /*
     * Load Ground
     */
    // ground = tm.addSprite({url: "Resources/flappyBird/ground.png", width: 256*50, height: 256, tile: true, layer: 5});
    ground = tm.addSprite({url: "Resources/flappyBird/ground.png", width: 256*50, height: 256, tile: true, layer: 5});
    
    /*
     * Load Bird animation
     */
    bird = tm.addSprite({url: "Resources/flappyBird/bird.png", width: 128, height: 128, px: 66, py: 70, x: 100, y: 100, layer: 1});
    
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

/* 
 * If view has been resized, start the game
 *  if not wait 100ms and retry
 */
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
    width = parseInt(e.width);
    height = parseInt(e.height);
    ground.y = height - groundHeight;
}

/*
 * Change game stage
 * Here set actions required when game stage is changing 
 */
function setGameStage(newGameStage)
{
    switch(newGameStage)
    {
        /* 
         * Action if current game stage become "starting"
         */
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

                
                for(var n = 0; n < miscs.length; n++)
                {
                    miscs[n].remove();
                }
                miscs = new Array();
            }

            ready.x = width/2;
            ready.y = (height - groundHeight) / 2;
            new Tween.Tween(ready)
            .to({y: -90}, 1000)
            .easing(Tween.Easing.Elastic.In).delay(1500).start();

            bird.playAnimation({loop: 0, pingpong: true, duration: 300});
            random = new Random(1);
        break;

        /* 
         * Action if current game stage become "gameover"
         */
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
 * This is called for each frame
 * Here set actions depending on current game stage
 */ 
function loop()
{
    frameTime = Date.now();
    switch(gameStage)
    {
        
        /*
         * Actions, if current game stage is "starting"
         */
        case "starting" :
            updateWorld();
            bird.y = (height - groundHeight) * 0.5;
            bird.vy = 0;
            bird.r = 0;
            if(gameStageDuration() > 3000)
            {
                setGameStage("running");
            }
        break;

        /*
         * Actions, if current game stage is "running"
         */
        case "running" :
            updateWorld();
            updateBird();
            updatePipes();
            performCollisions();
        break;

    }
    lastFrameTime = frameTime;
    Tween.update(); //Requiered for tweens to be updated 
}

/*
 * Bird updating when the game is running
 */
function updateBird()
{                     
    bird.vy += gravity * frameDuration();       //Move bird up or down depending on vertical speed
    bird.vy *= 0.99;                            //Some friction
    bird.targetRotate = 45 * bird.vy / 1000;    //Rotate bird dependingon vertical speed
    bird.r += (bird.targetRotate - bird.r) * 0.7;
    bird.y += bird.vy * frameDuration();        //Move bird up or down
}

/*
 * World updating  when the game is running
 */
function updateWorld()
{
    /* 
     * Move ground
     */
    ground.x = - (Date.now() * worldSpeed) % 595;
    ground.y = height - groundHeight;
    
    /*
     * Move pipes upward
     */
    for(var n = 0; n < pipesUp.length; n++)
    {
        var pipe = pipesUp[n];
        pipe.x = pipe.startX - (Date.now()- pipe.startTime) * worldSpeed;
    }
    
    /*
     * Move pipes downard
     */
    for(var n = 0; n < pipesDown.length; n++)
    {
        var pipe = pipesDown[n];
        pipe.x = pipe.startX - (Date.now()- pipe.startTime) * worldSpeed;
    }

    
    /*
     * Move miscs objects
     */
    for(var n = 0; n < miscs.length; n++)
    {
        var misc = miscs[n];
        misc.x = misc.startX - (Date.now()- misc.startTime) * worldSpeed;
    }
}

/*
 * Pipes updating  when the game is running
 */
function updatePipes()
{
    /*
     * If last update was less than 2s ago, do nothing
     */
   if((Date.now() - lastPipeCreateTime) > 1500)
   {
       /*
        * Compute random height for tube
        * @todo: use a pseudo random number generator to always get same level
        */
        var topPostion = random.nextFloat() * (height - groundHeight) / 2 + (height - groundHeight) / 2;
        
        /* 
         * Get a random value that determine if we create a pipe upward, downward or both
         * @todo: use a pseudo random number generator to always get same level
         */
        var rand = Math.floor(random.nextFloat() * 7);// Math.floor(Math.random() * 7);

        /*
         * Create a pipe upward randomly
         */
        if(rand == 1 || rand == 2 || rand == 3 || rand == 4 || rand == 5)
        {
            Ti.API.info("pipe 1");
            var pipe = tm.addSprite({url: "Resources/flappyBird/pipeUp.png", width: 125, x: width + 100, y: topPostion, px: 62});
            pipe.startX = pipe.x;
            pipe.startTime = Date.now();
            pipesUp.push(pipe);

            var grass = tm.addSprite({url: "Resources/flappyBird/grass.png", x: width + 100, y: height - groundHeight, px: 75, py: 37, layer: 6});
            grass.startX = grass.x;
            Ti.API.info("grass.startX = " + grass.startX);
            grass.startTime = Date.now();
            miscs.push(grass);
        }
        
        /*
         * Create a pipe downard randomly
         */
        if(rand == 2 || rand == 3 || rand == 4 || rand == 5 || rand == 6)
        {
            Ti.API.info("pipe 2");
            var pipe = tm.addSprite({url: "Resources/flappyBird/pipeDown.png", width: 125, x: width + 100, y: topPostion - 130, px: 62, sy: -1});
            pipe.startX = pipe.x;
            pipe.startTime = Date.now();
            pipesDown.push(pipe);
        }
        lastPipeCreateTime = Date.now();
   }

}

/*
 * Test for bird collisions on ground or pipes
 */
function performCollisions()
{
    /*
     * Collision on ground ?
     */
    if(bird.y > ground.y - 20)
    {
        setGameStage("gameover");
    }

    /*
     * Collision on pipes upward ?
     */
    for(var n = 0; n < pipesUp.length; n++)
    {
        var pipe = pipesUp[n];
        if(bird.x > pipe.x - 82 && bird.x<pipe.x + 82 && bird.y > pipe.y - 20)
        {
            setGameStage("gameover");
        }
    }

    /*
     * Collision on pipes downward ?
     */
    for(var n = 0; n < pipesDown.length; n++)
    {
        var pipe = pipesDown[n];
        if(bird.x > pipe.x - 82 && bird.x<pipe.x + 82 && bird.y < pipe.y + 20)
        {
            setGameStage("gameover");
        }

    }
}

/*
 * Return the current frame duration in second
 */
function frameDuration()
{
    if(lastFrameTime == 0)
    {
        return 0;
    }
    return (frameTime - lastFrameTime) * 0.001;
}

/*
 * Return the current game stage duration in ms
 */
function gameStageDuration()
{
    return Date.now() - gameStageStartTime;
}


/*
 * Touch must be declared as an attribute of the Alloy tag TIGLView (eg: onTouch="touch")
 * Manage touch events
 */ 
function touch(e)
{
   switch(e.action)
   {
       case "down" :
            if(gameStage == "running")
            {
                bird.vy = -500;
            }
        break;

        case "up" :
            if(gameStage == "gameover" && gameStageDuration() > 2000)
            {
                setGameStage("starting");
            }
        break;
   }

}
