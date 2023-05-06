(function(imageproc) {
    "use strict";

    /* Comic palette colour list */
    var palette = [
        [254, 251, 198],
        [255, 247, 149],
        [255, 240,   1],
        [189, 223, 198],
        [120, 201, 195],
        [  0, 166, 192],
        [190, 219, 152],
        [128, 197, 152],
        [  0, 163, 154],
        [251, 194, 174],
        [244, 148, 150],
        [234,  31, 112],
        [253, 193, 133],
        [246, 146, 120],
        [235,  38,  91],
        [184, 229, 250],
        [109, 207, 246],
        [  0, 173, 239],
        [249, 200, 221],
        [244, 149, 189],
        [233,   3, 137],
        [183, 179, 216],
        [122, 162, 213],
        [  0, 140, 209],
        [184, 137, 189],
        [132, 127, 185],
        [  0, 111, 182],
        [183,  42, 138],
        [143,  50, 141],
        [ 56,  58, 141],
        [187, 176, 174],
        [132, 160, 172],
        [  0, 137, 169],
        [188, 135, 151],
        [139, 126, 152],
        [  1, 110, 151],
        [198, 216,  54],
        [138, 192,  68],
        [  0, 160,  84],
        [190, 175, 136],
        [135, 159, 137],
        [  0, 137, 139],
        [189, 136, 120],
        [140, 126, 123],
        [  0, 110, 125],
        [255, 189,  33],
        [247, 145,  44],
        [236,  42,  50],
        [186,  45, 114],
        [144,  52, 115],
        [ 59,  59, 121],
        [194, 171,  57],
        [142, 156,  68],
        [  0, 135,  79],
        [189,  50,  55],
        [147,  56,  62],
        [ 61,  60,  65],
        [188,  48,  93],
        [145,  54,  97],
        [ 61,  60, 102],
        [191, 134,  57],
        [145, 125,  66],
        [  0, 108,  72],
        [  0,   0,   0],
        [255, 255, 255],
    ];

    function fromRGBtoHSV(r, g, b) {
        r /= 255, g /= 255, b /= 255;

        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max == 0 ? 0 : d / max;

        if (max == min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            h *= 60;
        }

        return {"h": h, "s": s, "v": v};
    }

    function fromHSVToRGB(h, s, v) {
        var r, g, b;

        var i = Math.floor(h / 60.0);
        var f = h / 60.0 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }

        return {"r": Math.round(r * 255),
                "g": Math.round(g * 255),
                "b": Math.round(b * 255)};
    }

    /*
     * Convert the colours in the input data to comic colours
     */
    imageproc.comicColor = function(inputData, outputData, saturation) {
        console.log("Applying comicnnnnn color...");

        /*
         * TODO: You need to complete the comic colour function so that
         * the pixels are mapped to one of the comic colours
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            
            var r = inputData.data[i];
            var g = inputData.data[i + 1];
            var b = inputData.data[i + 2];

            // First, you convert the colour to HSL
            // then, increase the saturation by the saturation factor
            // ***** beware of the final range of the saturation *****
            // after that, convert it back to RGB

            //console.log(imageproc.fromRGBtoHSV(r,g,b));
            //console.log("pooppppp");
            var HSVholder = fromRGBtoHSV(r,g,b);

            if (HSVholder.s*saturation > 1){
                HSVholder.s = 1;
            }else{
                HSVholder.s = HSVholder.s*saturation;
            }

            var RGBholder = fromHSVToRGB(HSVholder.h,HSVholder.s,HSVholder.v);

            //r = RGBholder.r;
            //g = RGBholder.g;
            //b = RGBholder.b;
        
            // Second, based on the saturated colour, find the matching colour
            // from the comic colour palette
            // This is done by finding the minimum distance between the colours
            var dist = 1000;
            var closestComic = 0;


            for (var j = 0; j < palette.length; j++){
                var rDiff = palette[j][0] - RGBholder.r;
                var gDiff = palette[j][1] - RGBholder.g;
                var bDiff = palette[j][2] - RGBholder.b;

                if(Math.hypot(rDiff, gDiff, bDiff) < dist)
                {
                    closestComic = j;
                    dist = Math.hypot(rDiff, gDiff, bDiff);
                }
                //console.log(dist);
            }

            outputData.data[i]     = palette[closestComic][0];
            outputData.data[i + 1] = palette[closestComic][1];
            outputData.data[i + 2] = palette[closestComic][2];
            /*
            outputData.data[i]     = RGBholder.r;
            outputData.data[i + 1] = RGBholder.g;
            outputData.data[i + 2] = RGBholder.b;*/
        }
    }
 
}(window.imageproc = window.imageproc || {}));
