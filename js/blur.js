(function(imageproc) {
    "use strict";

    /*
     * Apply blur to the input data
     */
    imageproc.blur = function(inputData, outputData, kernelSize) {
        console.log("Applying blur...");

        // You are given a 3x3 kernel but you need to create a proper kernel
        // using the given kernel size
        var kernel = [ [1, 1, 1], [1, 1, 1], [1, 1, 1] ];

        /**
         * TODO: You need to extend the blur effect to include different
         * kernel sizes and then apply the kernel to the entire image
         */

        // Apply the kernel to the whole image
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                // Use imageproc.getPixel() to get the pixel values
                // over the kernel
                var blurR = 0;
                var blurG = 0;
                var blurB = 0;



                for (var j = -1; j <= 1; j++){
                    for (var k = -1; k <= 1; k++){
                        var tempPixel = imageproc.getPixel(inputData, x+j, y+k, "wrap");
                        //blurR += tempPixel.
                    }
                }

                var finalBlur = blurSum/9;

                // Then set the blurred result to the output data
                
                var i = (x + y * outputData.width) * 4;
                outputData.data[i]     = inputData.data[i];
                outputData.data[i + 1] = inputData.data[i + 1];
                outputData.data[i + 2] = inputData.data[i + 2];
            }
        }
    } 

}(window.imageproc = window.imageproc || {}));
