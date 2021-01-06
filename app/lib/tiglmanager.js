/*
*	© Copyright DzzD, Bruno Augier 2013-2021 (bruno.augier@dzzd.net)
*	 This file is part of TIGL.
*
*    TIGL is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    any later version.
*
*    TIGL is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*	 along with TIGL.  If not, see <https://www.gnu.org/licenses/>
*/

const FPS = require("fps");
var fps = new FPS("TIGLManager","Datas send");
class Entity
{
    constructor(options, tiglManager)
    {
        this.tiglManager = tiglManager;
        this.positionDirty = false;
        this.rotationDirty = false;
        this.scaleDirty = false;
        this.pivotDirty = false;
        this._x = options.x ? options.x : 0
        this._y = options.y ? options.y : 0;
        this._r = options.r ? options.r : 0;
        this._sx = options.sx ? options.sx : 1;
        this._sy = options.sy ? options.sy : 1;
        this._px = options.sx ? options.sx : 0;
        this._py = options.sy ? options.sy : 0;
        this._touchEnabled = options.touchEnabled ? options.touchEnabled : false;
        this.onTouchListener = new Array();

    }

    addEventListener(event, callback)
    {
        if(event == "touch")
        {
            this.onTouchListener.push(callback);
            this.touchEnabled = true;
            
        }
    }

    removeEventListener(event, callback)
    {
        if(event == "touch")
        {
            var index = this.onTouchListener.indexOf(callback);
            if (index > -1) 
            {
                this.onTouchListener.splice(index, 1);
            }
        }
    }

    _onTouch(e)
    {
        for(var n = 0; n < this.onTouchListener.length; n++)
        {
            this.onTouchListener[n].call(this, e);
        }
    }

    set x(value)
    {
        this.positionDirty = this.positionDirty || (this._x != value);
        this._x = value;
    }

    get x()
    {
        return this._x;
    }
    
    set y(value)
    {
        this.positionDirty = this.positionDirty || (this._y != value);
        this._y = value;
    }

    get y()
    {
        return this._y;
    }
    
    set r(value)
    {
        this.rotationDirty = this.rotationDirty || (this._r != value);
        this._r = value;
    }

    get r()
    {
        return this._r;
    }

    set sx(value)
    {
        this.scaleDirty = this.scaleDirty || (this._sx != value);
        this._sx = value;
    }

    get sx()
    {
        return this._sx;
    }

    set sy(value)
    {
        this.scaleDirty = this.scaleDirty || (this._sy != value);
        this._sy = value;
    }

    get sy()
    {
        return this._sy;
    }

    set px(value)
    {
        this.pivotDirty = this.pivotDirty || (this._px != value);
        this._px = value;
    }

    get px()
    {
        return this._px;
    }

    set py(value)
    {
        this.pivotDirty = this.pivotDirty || (this._py != value);
        this._py = value;
    }

    get py()
    {
        return this._py;
    }

    
    set touchEnabled(value)
    {
        if(this._touchEnabled != value) this.tiglManager.tiglView.setTouchEnabledById(this.id, value);
        this._touchEnabled = value;
    }

    get touchEnabled()
    {
        return this._touchEnabled;
    }

    playAnimation(options)
    {
        this.tiglManager.tiglView.playEntityAnimationById(this.id, options);
    }

}

class Sprite extends Entity
{
    constructor(options, tiglManager)
    {
        super(options, tiglManager);
    }

}

class TIGLManager
{
    constructor(tiglView)
    {
        this.tiglView = tiglView;
        this.entities = new Map();
        var self = this;
        this.tiglView.addEventListener("loopFinished", function(){self._onLoopFinished()});
        this.tiglView.addEventListener("touch", function(e){self._onTouch(e)});
    }

    addSprite(options)
    {
        let id = this.tiglView.addSprite(options);
        let entity = new Sprite(options, this)
        entity.id = id;
        this.entities.set(id, entity);
        return entity;
    }

    getEntities()
    {
        return this.entities;
    }

    getEntityById(id)
    {
        return this.entities.get(id);
    }

    _onLoopFinished()
    {
        //Ti.API.info("onLoopFinished()");
        fps.start();
        this._updateSceneDatas();
        fps.end();
    }

    
    _onTouch(e)
    {
        // Ti.API.info("_onTouch() " + e.entityId);
        var entityId = e.entityId;
        if(entityId != 0)
        {
            var entity = this.getEntityById(entityId);
            if(entity != null)
            {
                entity._onTouch(e);
            }
        }
    }

    _updateSceneDatas()
    {
        let positionsPackedXY = Array();
        let rotationsPackedR = Array();
        let scalesPackedSxSy = Array();
        let pivotsPackedPxPy = Array();

        /*
         * Process modified properties
         */
        for (var [id, entity] of this.entities)
        {
            if(entity.positionDirty)
            {
                entity.positionDirty = false;
                let x = entity.x;
                let y = entity.y;
                if(x > -32768 && x < 32767 && y > -32768 && y < 32767) 
                {
                    let packedXY = ((parseInt(x + 32768)<<16)&0xFFFF0000) | (parseInt(y + 32768)&0xFFFF);
                    positionsPackedXY.push(id);
                    positionsPackedXY.push(packedXY);
                }
            }
            
            if(entity.rotationDirty)
            {
                entity.rotationDirty = false;
                let packedR = ((entity.r % 360) * 0x1000000 / 360);
                rotationsPackedR.push(id);
                rotationsPackedR.push(packedR);
            }
            
            if(entity.scaleDirty)
            {
                entity.scaleDirty = false;
                scalesPackedSxSy.push(id);
                scalesPackedSxSy.push(entity.sx * 10000);
                scalesPackedSxSy.push(entity.sy * 10000);
            }
            
            if(entity.pivotDirty)
            {
                entity.pivotDirty = false;
                let px = entity.px;
                let py = entity.py;
                if(px > -32768 && px < 32767 && py > -32768 && py < 32767) 
                {
                    let packedPxPy = ((parseInt(px + 32768)<<16)&0xFFFF0000) | (parseInt(py + 32768)&0xFFFF);
                    pivotsPackedPxPy.push(id);
                    pivotsPackedPxPy.push(packedPxPy);
                }
            }
        }

        if(positionsPackedXY.length>0)
        {
            this.tiglView.setEntitiesPositionsPacked(positionsPackedXY);
        }

        if(rotationsPackedR.length>0)
        {
            this.tiglView.setEntitiesRotationsPacked(rotationsPackedR);
        }

        if(scalesPackedSxSy.length>0)
        {
            this.tiglView.setEntitiesScalesPacked(scalesPackedSxSy);
        }

        if(pivotsPackedPxPy.length>0)
        {
            this.tiglView.setEntitiesPivotsPacked(pivotsPackedPxPy);
        }
    }
}

module.exports = TIGLManager;
