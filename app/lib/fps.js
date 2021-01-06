class FPS
{
    constructor(tag, label, frameReset)
    {
        this.tag = tag ? tag : "FPS";
        this.label = label ? label : "Javascript";
        this.frameCount = 0;
        this.frameTime = 0;
        this.timeStart = 0;
        this.frameReset = frameReset ? frameReset : 300;
    }

    start()
    {
        if(this.frameCount==0)
        {
            this.timeStart = Date.now();
            this.frameTime = 0;
        }
        this.frameTimeStart = Date.now();
    }

    end()
    {
        this.frameCount++;
        this.frameTime += Date.now() - this.frameTimeStart;
        if( this.frameCount == this.frameReset)
        {
            Ti.API.info(this.tag + ": " + this.label + " (time/frame): " + (this.frameTime / this.frameCount).toFixed(2) + " ms") ;
            this.frameCount = 0;
        }
    }

}

module.exports = FPS;