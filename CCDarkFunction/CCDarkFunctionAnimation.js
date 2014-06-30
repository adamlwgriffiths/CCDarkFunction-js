
// add a loader for DarkFunction types
// this is just a standard text/xml loader
cc._dfeLoader = {
    load:function(realUrl, url, res, cb) {
        cc.loader.loadTxt(realUrl, cb);
    }
}
cc.loader.register(["sprites", "anim"], cc._dfeLoader);

cc.DarkFunctionAnimation = cc.Class.extend({
    ctor: function(resource) {
        this.resource = null;
        this.image = null;
        this.animations = {};
        this.anim = null;
        this.sprites = null;

        if (resource !== undefined)
        {
            this.load(resource);
        }
    },

    load: function(resource) {
        this.resource = resource;

        var xmlDoc;
        var xmlParser = new cc.SAXParser();

        // load the anim file
        //xmlDoc = loadXMLString(cc.loader.getRes(resource));
        xmlDoc = xmlParser.parse(cc.loader.getRes(resource));
        this.anim = new cc.DarkFunctionAnim(xmlDoc);

        // the filename will be the resource - filename
        var base_path = resource.slice(0,resource.lastIndexOf('/')+1);

        var sprites_path = base_path + this.anim.spriteSheet;
        //xmlDoc = loadXMLString(cc.loader.getRes(sprites_path));
        xmlDoc = xmlParser.parse(cc.loader.getRes(sprites_path));
        this.sprites = new cc.DarkFunctionSprites(xmlDoc);

        this.image = base_path + this.sprites.name;

        // get the sprite image
        this.animations = {};
        for(var anim_key in this.anim.anims)
        {
            var anim = this.anim.anims[anim_key];

            var frames = [];
            for(var cell_index=0; cell_index < anim.cells.length; ++cell_index)
            {
                var cell = anim.cells[cell_index];

                for(var spr_index=0; spr_index < cell.sprites.length; ++spr_index)
                {
                    var spr = cell.sprites[spr_index];

                    // get the sprite by name
                    var sprite = this.sprites.sprites[spr.name];

                    var rect = new cc.Rect(sprite.x, sprite.y, sprite.w, sprite.h);
                    // y is top left, so we need -ve y
                    var offset = new cc.Point(spr.x, -spr.y);
                    var originalSize = new cc.Size(rect.width + Math.abs(offset.x), rect.height + Math.abs(offset.y));

                    // create a sprite frame
                    var spriteFrame = cc.SpriteFrame.create(this.image, rect, false, offset, originalSize);

                    // cache the sprite
                    cc.spriteFrameCache.addSpriteFrame(spriteFrame, spr.name);

                    // create an animation
                    var animationFrame = cc.AnimationFrame.create(spriteFrame, cell.delay, null);
                    frames.push(animationFrame);

                    // only get the first sprite
                    break;
                }
            }

            // we need an overall animation speed
            // 0.05 seems to mimic DarkFunction
            var animation = cc.Animation.create(frames, 0.05);

            // cache the animation
            cc.animationCache.addAnimation(animation, anim.name);

            this.animations[anim.name] = animation;
        }
    }
});

cc.DarkFunctionAnimation.create = function(resource) {
    return new cc.DarkFunctionAnimation(resource);
};
