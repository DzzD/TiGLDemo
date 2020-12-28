/*
import _GLView from "fr.dzzd.glsprite.GLView";
import GLSprite from "fr.dzzd.glsprite.GLSprite";

//requestAnimationFrame("glsprite")

var TIGLView = _GLView.extend(
{
	onCreated : function() 
    {
		Ti.API.info("_GLView.onCreated()");
		//this.oninit = oninit;
		//this.onloop = onloop;
		this.entities = Array();
		this.lastUpdateBulkPos = Array();
		this.scene = this.getScene();
		//this.scene = this.renderer.getScene();

		if(this.oninit)
		{
			if (typeof this.oninit === 'function') 
			{
				this.oninit.call(this, this);
			}
			else
			{
				if (typeof this.oninit === 'string')
				{
					eval(this.oninit);
				}
			}
		}
	},
	
	onChanged : function(w, h) 
	{
		this.width = w;
		this.height = h;
	},

	onDraw : function() 
    {
		if(this.onloop)
		{
			if (typeof this.onloop === 'function') 
			{
				this.onloop.call(this, this);
			}
			else
			{
				if (typeof this.onloop === 'string')
				{
					eval(this.onloop);
				}
			}
		}
		
		this.updatePosXY();
    },
    
    addSprite : function(options) 
    {
        var sprite;
        sprite = new GLSprite(options.url, options);
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
            
			packetsFull[packetsFullCount++] = packedXY;
		}
		
		if(packetsFullCount > 0)
		{
			this.scene.updateBulkModeXY(packetsFull, true);
		}
    }
});

module.exports = TIGLView;

exports.createGLView = function(args)
{
	var glView = new TIGLView();
    return glView;
}
*/

var tigl = require('fr.dzzd.glsprite');

function TIGLInterface()
{
	this.view = tigl.createGLView();
	this.entities = Array();
	this.width = 500;
	this.height = 1000;	

	var self = this;
	//this.view.addSprite({url : "Resources/background.png", width : 500, height: 500, tile : true});
	this.view.addEventListener("created",function(e)
	{
		
		Ti.API.info("onCreated(e)");
		
		if(self.oninit != null)
		{
			self.oninit.call(self);
		}
	});


	this.view.addEventListener("changed",function(e)
	{
		Ti.API.info("onChanged(" + e.width +", "+ e.height + ")");
		self.width = e.width;	
		self.height = e.height;	
	});


	this.view.addEventListener("draw", function(e)
	{
		//Ti.API.info("onDraw(e)");
		if(self.onloop != null)
		{
			self.onloop.call(self);
		}
		//self.updatePosXY();
	});

	
    this.addSprite = function(options) 
    {
        var sprite;
        sprite = new Object();
		sprite.x = sprite.x;
		sprite.y = sprite.y;
		
		self.entities.push(sprite);
		self.view.addSprite(options);
    }
    

	this.updatePosXY =  function() 
    {
		
		let packetsFull = new Array();
		let packetsFullCount = 0;
        for(var index = 0; index < self.entities.length; index++)
        {
            let entity = self.entities[index];
			let x = entity.x;
			let y = entity.y;
            let packedXY = ((parseInt(x*2 + 32768)<<16)&0xFFFF0000) | (parseInt(y*2 + 32768)&0xFFFF);
			packetsFull[packetsFullCount++] = packedXY;
		}
		
		if(packetsFullCount > 0)
		{
			self.view.updateBulkModeXY(packetsFull, true);
		}
    }
	
  }




exports.createTIGL = function(args)
{
	var tiglInterface = new TIGLInterface();
	return tiglInterface;

}





