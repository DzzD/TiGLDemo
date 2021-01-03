
class Entity
{
    constructor(options)
    {
        this.positionDirty = false;
        this.rotationDirty = false;
        this._x = options.x ? options.x : 0
        this._y = options.y ? options.y : 0;
        this._r = options.r ? options.r : 0;
    }

    set x(value)
    {
        this._x = value;
        this.positionDirty = true;
    }

    get x()
    {
        return this._x;
    }
    
    set y(value)
    {
        this._y = value;
        this.positionDirty = true;
    }

    get y()
    {
        return this._y;
    }
    
    set r(value)
    {
        this._r = value;
        this.rotationDirty = true;
    }

    get r()
    {
        return this._r;
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
        return id;
    }

    getEntityById(id)
    {
        return this.entities.get(id);
    }

    terminate()
    {
        let positionsPackedXY = Array();

        /*
         * Process modified properties
         */
        for (const [id, entity] of this.entities)
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
        }

        if(positionsPackedXY.length>0)
        {
            this.tiglView.setEntityPosPacked(positionsPackedXY);
        }
    }
}

module.exports = TIGLManager;