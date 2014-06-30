
cc.DarkFunctionSprites = function(xmlDoc) {
    this.name = xmlDoc.documentElement.attributes.getNamedItem("name").value;
    this.w = parseInt(xmlDoc.documentElement.attributes.getNamedItem("w").value, 10);
    this.h = parseInt(xmlDoc.documentElement.attributes.getNamedItem("h").value, 10);

    this.sprites = {};
    var sprs = xmlDoc.getElementsByTagName("spr");
    for(var index = 0; index < sprs.length; ++index) {
        var spr = sprs[index];

        // determine the full path by iterating backwards
        var path = '';
        var parent = spr.parentNode;
        while((parent != "undefined") && (parent.nodeName == "dir")) {
            path = parent.attributes.getNamedItem("name").value + "/" + path;
            parent = parent.parentNode;
        }
        // remove the leading / and trailing /
        path = path.slice(1,-1);

        // create a sprite object
        var sprite = {
            path: path,
            name: spr.attributes.getNamedItem("name").value,
            x: parseInt(spr.attributes.getNamedItem("x").value, 10),
            y: parseInt(spr.attributes.getNamedItem("y").value, 10),
            w: parseInt(spr.attributes.getNamedItem("w").value, 10),
            h: parseInt(spr.attributes.getNamedItem("h").value, 10)
        };

        var full_path = sprite.path + "/" + sprite.name;
        this.sprites[full_path] = sprite;
    }
}
