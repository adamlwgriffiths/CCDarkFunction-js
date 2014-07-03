
cc.DarkFunctionAnim = function(xmlDoc) {
    this.spriteSheet = xmlDoc.documentElement.attributes.getNamedItem("spriteSheet").value;
    this.ver = xmlDoc.documentElement.attributes.getNamedItem("ver").value;

    this.anims = {};
    var anims = xmlDoc.getElementsByTagName("anim");
    for(var anim_index=0; anim_index < anims.length; ++anim_index) {
        var _anim = anims[anim_index];

        var anim = {
            name: _anim.attributes.getNamedItem("name").value,
            loops: parseInt(_anim.attributes.getNamedItem("loops").value, 10),
            cells: []
        };

        var cells = _anim.getElementsByTagName("cell");
        for(var cell_index=0; cell_index < cells.length; ++cell_index)
        {
            var _cell = cells[cell_index];

            var cell = {
                index: parseInt(_cell.attributes.getNamedItem("index").value, 10),
                delay: parseInt(_cell.attributes.getNamedItem("delay").value, 10),
                sprites: []
            };

            var sprs = _cell.getElementsByTagName("spr");
            for(var spr_index=0; spr_index < sprs.length; ++spr_index)
            {
                var _spr = sprs[spr_index];

                var spr = {
                    name: _spr.attributes.getNamedItem("name").value,
                    x: parseInt(_spr.attributes.getNamedItem("x").value, 10),
                    y: parseInt(_spr.attributes.getNamedItem("y").value, 10),
                    z: parseInt(_spr.attributes.getNamedItem("z").value, 10)
                };

                // add to cell
                cell.sprites.push(spr);
            }

            // add to anim
            anim.cells[cell.index] = cell;
        }

        // add to anims
        this.anims[anim.name] = anim;
    }
};

