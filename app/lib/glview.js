import _GLView from "fr.dzzd.glsprite.GLView";
import _GLEntity from "fr.dzzd.glsprite.GLEntity";
import _GLSprite from "fr.dzzd.glsprite.GLSprite";

var GLView = _GLView.extend(
{
		/*
		this.nb = 32;
		
		Ti.API.info("GameView.onCreated()");
		
        this.nb = 32;
		this.lastUpdateBulkPos = new Array();
		
        this.frameCount = 0;
        this.startTime = 0;
		

		//Load sprites
		this.addSprite({url : "Resources/background.png", width : this.getWidth(), height: this.getHeight(), tile : "true"});
		for(let n = 1; n < this.nb*this.nb; n++)
		{
			this.addSprite({url : "Resources/robot.png", width : "50", height: "50"});
		}
		*/
	

	onCreated : function() 
    {
		Ti.API.info("_GLView.onCreated()");
		//this.oninit = oninit;
		//this.onloop = onloop;
		this.entities = Array();
		this.lastUpdateBulkPos = Array();
		this.scene = this.getScene();
		//this.scene = this.renderer.getScene();

		if(this.oninit){this.oninit.call(this, this);}
	},
	
	onChanged : function(w, h) 
	{
		this.width = w;
		this.height =h;
	},

	onDraw : function() 
    {
	
		if(this.onloop){this.onloop.call(this, this);}
		
		this.updatePosXY();
    },
    
    addSprite : function(options) 
    {
        var sprite;
        sprite = new _GLSprite(options.url, options);
		options.x = sprite.x;
		options.y = sprite.y;
		options.z = sprite.z;
		options.r = sprite.r;
		options.px = sprite.px;
		options.py = sprite.py;
		options.sx = sprite.scaleX;
		options.sy = sprite.scaleY;
		options.width = sprite.width;
		options.height = sprite.height;
		options.id= this.entities.length;
		this.entities.push(options);
		this.scene.add(sprite);
    },
    
    updatePosXY : function() 
    {
		
		let packetsFull = new Array();
		let packetsFullCount = 0;
        // let packets = new Array();
		// let packetsCount = 0;

		//Detect les changement
		// for(var index = 0; index < this.entities.length; index++)
        // {
		// 	let entity = this.entities[index]

		// }			// Ti.API.info("this.entities.length " + this.entities.length);
        for(var index = 0; index < this.entities.length; index++)
        {
			//todo: utiliser lastX, lastY
            let entity = this.entities[index];
			let x = entity.x;
			let y = entity.y;
            let packedXY = ((parseInt(x*2 + 32768)<<16)&0xFFFF0000) | (parseInt(y*2 + 32768)&0xFFFF);
            /*if(this.lastUpdateBulkPos[id] != packedXY)
            {
                packets[packetsCount++] = id;
				packets[packetsCount++] = packedXY;
			}*/
			// this.lastUpdateBulkPos[id] = packedXY;

			packetsFull[packetsFullCount++] = packedXY;
		}
		// Ti.API.info("packetsFullCount " + packetsFullCount);
		// Ti.API.info("packetsFullSize " + packetsFull.length);
		
		if(packetsFullCount > 0)
		{//Ti.API.info("packetsFullCount " + packetsFullCount);
			this.scene.updateBulkModeXY(packetsFull, true);
		}
    }
});

module.exports = GLView;

exports.createGLView = function(args)
{
	var glView = new GLView();
    return glView;
}


