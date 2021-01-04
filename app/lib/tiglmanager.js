
class Entity
{
    constructor(options)
    {
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

}

class Sprite extends Entity
{
    constructor(options)
    {
        super(options)
    }

}

class TIGLManager
{
    constructor(tiglView)
    {
        this.tiglView = tiglView;
        this.entities = new Map();
    }

    addSprite(options)
    {
        let id = this.tiglView.addSprite(options);
        let entity = new Sprite(options)
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

    terminate()
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
                let packedR = ((entity.r % 360) * 0x1000000 / 180);
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