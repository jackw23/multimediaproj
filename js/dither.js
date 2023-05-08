(function(imageproc) {
    "use strict";

    /*
     * Apply ordered dithering to the input data
     */
    imageproc.dither = function(inputData, outputData, matrixType) {
        console.log("Applying error dithering...");

        var error = 0;
        var threshold = 128;
        var result;
        
        console.log("threshold: " + threshold);

        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                var pixel = imageproc.getPixel(inputData, x, y);
                var grayscale = (pixel.r + pixel.g + pixel.b) / 3;
                var grayscale = grayscale - error;

                if (grayscale < threshold) {
                    result = 0;
                } else {
                    result = 255;
                }
                error = result - grayscale;

                var i = (x + y * outputData.width) * (4);
                outputData.data[i]     = result;
                outputData.data[i + 1] = result;
                outputData.data[i + 2] = result;
                 
                if(x+1 < inputData.width){
                    var ri = ((x+1) + y * outputData.width) * (4);
                    outputData.data[ri]     += Math.round(error*(7.0/16));
                    outputData.data[ri + 1] += Math.round(error*(7.0/16));
                    outputData.data[ri + 2] += Math.round(error*(7.0/16));
                }

                if(x-1 >= 0 && y+1 < inputData.height){
                    var ldi = ((x-1) + (y+1) * outputData.width) * (4);
                    outputData.data[ldi]     += Math.round(error*(3.0/16));
                    outputData.data[ldi + 1] += Math.round(error*(3.0/16));
                    outputData.data[ldi + 2] += Math.round(error*(3.0/16));
                }
                
                if(y+1 < inputData.height){
                    var di = (x + (y+1) * outputData.width) * (4);
                    outputData.data[di]     += Math.round(error*(5.0/16));
                    outputData.data[di + 1] += Math.round(error*(5.0/16));
                    outputData.data[di + 2] += Math.round(error*(5.0/16));
                }

                if(x+1 < inputData.width && y+1 < inputData.height){
                    var rdi = ((x+1) + (y+1) * outputData.width) * (4);
                    outputData.data[rdi]     += Math.round(error*(1.0/16));
                    outputData.data[rdi + 1] += Math.round(error*(1.0/16));;
                    outputData.data[rdi + 2] += Math.round(error*(1.0/16));;
                }
            }
        }
    }
 
}(window.imageproc = window.imageproc || {}));
