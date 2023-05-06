(function(imageproc) {
    "use strict";

    /*
     * Apply ordered dithering to the input data
     */
    imageproc.dither = function(inputData, outputData, matrixType) {
        console.log("Applying dithering...");

        /*
         * TODO: You need to extend the dithering processing technique
         * to include multiple matrix types
         */

        // At the moment, the code works only for the Bayer's 2x2 matrix
        // You need to include other matrix types
        
        // Set up the matrix
        var matrix = [];
        var levels = -1;

        switch(matrixType){

            case "bayer2":
                matrix = [ [1, 3], [4, 2] ];
                levels = 5;
                console.log("bayerddddddd");
                break;

            case "bayer4":
                matrix = [ [1, 9, 3, 11], [13, 5, 15, 7], [4, 12, 2, 10], [16, 8, 14, 6] ];
                levels = 17;
                console.log("bayer444444");
                break;

            case "line":
                /*
                matrix = [ [1, 1, 1, 1, 16], 
                            [1, 1, 1, 16, 1], 
                            [1, 1, 16, 1, 1], 
                            [1, 16, 1, 1, 1],
                            [16, 1, 1, 1, 1] ];
                            */
                
                //matrix = [ [5, 4, 3, 2, 1], [5, 4, 3, 2, 1], [5, 4, 3, 2, 1], [5, 4, 3, 2, 1]];
                matrix = [ [15, 15, 15, 15, 25], [15, 15, 15, 25, 15], [15, 15, 25, 15, 15], [15, 25, 15, 15, 15], [25, 15, 15, 15, 15, 15]];

                levels = 100;
                console.log("linedfiushdfu");
                break;

            case "diamond":
                matrix = [ [25, 15, 15, 15, 25], [15, 25, 15, 25, 15], [15, 15, 25, 15, 15], [15, 25, 15, 25, 15], [25, 15, 15, 15, 15, 25]];
                levels = 100;
                console.log("diamond");
                break;

        }

        // The following code uses Bayer's 2x2 matrix to create the
        // dithering effect. You need to extend it to work for different
        // matrix types

        var error = 0;
        var threshold = 220;
        var result;
        
        console.log("threshold: " + threshold);

        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                var pixel = imageproc.getPixel(inputData, x, y);

                // Change the colour to grayscale and normalize it
                var grayscale = (pixel.r + pixel.g + pixel.b) / 3;
                //value = value / 255 * levels;
                var grayscale = grayscale - error;

                if(grayscale < threshold){
                    result = 0;
                }else{
                    result = 255;
                }
                error = result - grayscale;
                //console.log("testing +");
                var i = (x + y * outputData.width) * (4);
                outputData.data[i]     = result;
                outputData.data[i + 1] = result;
                outputData.data[i + 2] = result;
                
                /*
                if(x+1 < inputData.width){
                    var ri = ((x+1) + y * outputData.width) * (4);
                    outputData.data[ri]     -= Math.round(error*(7.0/16));
                    outputData.data[ri + 1] -= Math.round(error*(7.0/16));
                    outputData.data[ri + 2] -= Math.round(error*(7.0/16));
                }

                if(x-1 >= 0 && y+1 < inputData.height){
                    var ldi = ((x-1) + (y+1) * outputData.width) * (4);
                    outputData.data[ldi]     -= Math.round(error*(3.0/16));
                    outputData.data[ldi + 1] -= Math.round(error*(3.0/16));
                    outputData.data[ldi + 2] -= Math.round(error*(3.0/16));
                }
                
                if(y+1 < inputData.height){
                    var di = (x + (y+1) * outputData.width) * (4);
                    outputData.data[di]     -= Math.round(error*(5.0/16));
                    outputData.data[di + 1] -= Math.round(error*(5.0/16));
                    outputData.data[di + 2] -= Math.round(error*(5.0/16));
                }

                if(x+1 < inputData.width && y+1 < inputData.height){
                    var rdi = ((x+1) + (y+1) * outputData.width) * (4);
                    outputData.data[rdi]     -= Math.round(error*(1.0/16));
                    outputData.data[rdi + 1] -= Math.round(error*(1.0/16));;
                    outputData.data[rdi + 2] -= Math.round(error*(1.0/16));;
                }
                */

                // Get the corresponding threshold of the pixel
                //console.log(matrix.length);
                //var threshold = matrix[y % matrix.length][x % matrix.length];

                // Set the colour to black or white based on threshold
                /*var i = (x + y * outputData.width) * (4);
                outputData.data[i]     = 200;
                outputData.data[i + 1] = 100;
                outputData.data[i + 2] = 100;//(value < threshold)? 0 : 255;*/
            }
        }
    }
 
}(window.imageproc = window.imageproc || {}));
