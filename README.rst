============================================
DarkFunction animation loader for Cocos2D-JS
============================================

Loads DarkFunction animation and sprite sheets into Cocos2D-JS.

Provides parsers for DarkFunction .anim and .sprites files for manual introspection
and a Cocos2D resource loader for .anim and .sprites files.


Example
=======

Loading an animation::

    var AnimationLayer = cc.Layer.extend({
        ctor: function() {
            this._super();

            var animations = cc.DarkFunctionAnimation.create("res/my_animation.anim");

            var texture = cc.textureCache.addImage(animations.image);
            this.spriteSheet = cc.SpriteBatchNode.create(texture);
            this.addChild(this.spriteSheet);

            var animation = cc.animationCache.getAnimation("animation_name");

            this.animation = cc.RepeatForever.create(cc.Animate.create(animation));
            this.sprite = cc.Sprite.create("#/animation_name/frame01");
            this.sprite.runAction(this.animation);
            this.spriteSheet.addChild(this.sprite);
        }
    });


Parse .anim and .sprites into a cc.DarkFunctionAnimation object::

    var animations;
    // new and load in 1 step
    animations = new cc.DarkFunctionAnimation("res/my_animation.anim");

    // new and load in 2 steps
    animations = new cc.DarkFunctionAnimation();
    animations.load("res/my_animation.anim");

    // create helper
    animations = cc.DarkFunctionAnimation.create("res/my_animation.anim");


Parsing .sprites::

    var sprites = new cc.DarkFunctionSprites("res/my_sprites.sprites");


Parsing .anim::

    var anim = new cc.DarkFunctionAnim("res/my_sprites.anim");


API
===

cc.DarkFunctionAnimation::

    {
        resource: the resource name of the anim file,
        image: the sprite sheet resource name from the anim file,
        animations: {
            name:cc.Animation
        },
        anim: the cc.DarkFunctionAnim object,
        sprites: the cc.DarkFunctionSprites object
    }


cc.DarkFunctionAnim::
    
    {
        spriteSheet: the .sprites filename (this must be converted to a resource path to be used),
        ver: the specified version,
        anims: {
            name:{
                name: animation name,
                loops: loops property as an int,
                cells: [{
                    index: frame number as an int,
                    delay: frame delay as an int,
                    sprites: [{
                        name: sprite name,
                        x: x offset,
                        y: y offset (remember to invert due to cocos y=0 being top),
                        z: z index
                    }]
                }]
            }
        }
    }

cc.DarkFunctionSprites::

    {
        name: sprite sheet image filename (this must be converted to a resource path to be used),
        w: the width of the sprite sheet image,
        h: the height of the sprite sheet image,
        sprites: {
            path (full path of sprite, eg "/walk/walk01"):{
                path: dir path of sprite, eg "/walk",
                name: name of sprite, eg "walk01",
                x: x offset in sprite sheet as an int,
                y: y offset in sprite sheet as an int,
                w: width of sprite as an int,
                h: height of sprite as an int
            }
        }
    }


Author
======

* `Adam Griffiths <https://github.com/adamlwgriffiths>`_
