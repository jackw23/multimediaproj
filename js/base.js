(function(imageproc) {
    "use strict";

    /*
     * Apply negation to the input data
     */
    imageproc.negation = function(inputData, outputData) {
        console.log("Applying negation...");

        for (var i = 0; i < inputData.data.length; i += 4) {
            outputData.data[i]     = 255 - inputData.data[i];
            outputData.data[i + 1] = 255 - inputData.data[i + 1];
            outputData.data[i + 2] = 255 - inputData.data[i + 2];
        }
    }

    /*
     * Convert the input data to grayscale
     */
    imageproc.grayscale = function(inputData, outputData) {
        console.log("Applying grayscale...");

        /**
         * TODO: You need to create the grayscale operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            
            // Find the grayscale value using simple averaging
            var intensity = (inputData.data[i] + inputData.data[i+1] + inputData.data[i+2])/3.0; 
            // Change the RGB components to the resulting value

            outputData.data[i]     = intensity;
            outputData.data[i + 1] = intensity;
            outputData.data[i + 2] = intensity;
            
            
        }
    }

    /*
     * Applying brightness to the input data
     */
    imageproc.brightness = function(inputData, outputData, offset) {
        console.log("Applying brightness...");

        /**
         * TODO: You need to create the brightness operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Change the RGB components by adding an offset

            var r = inputData.data[i] + offset;
            var g = inputData.data[i+1] + offset;
            var b = inputData.data[i+2] + offset;

            
            if (r > 255){
                r = 255;
            }if (g > 255){
                g = 255;
            }if (b > 255){
                b = 255;
            }

            outputData.data[i]     = r;
            outputData.data[i + 1] = g;
            outputData.data[i + 2] = b;

            // Handle clipping of the RGB components
        }
    }

    /*
     * Applying contrast to the input data
     */
    imageproc.contrast = function(inputData, outputData, factor) {
        console.log("Applying contrast...");

        /**
         * TODO: You need to create the brightness operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Change the RGB components by multiplying a factor

            var r = inputData.data[i]*factor;
            var g = inputData.data[i+1]*factor;
            var b = inputData.data[i+2]*factor;

            
            if (r > 255){
                r = 255;
            }if (g > 255){
                g = 255;
            }if (b > 255){
                b = 255;
            }

            outputData.data[i]     = r;
            outputData.data[i + 1] = g;
            outputData.data[i + 2] = b;

            // Handle clipping of the RGB components
        }
    }

    /*
     * Make a bit mask based on the number of MSB required
     */
    function makeBitMask(bits) {
        var mask = 0;
        for (var i = 0; i < bits; i++) {
            mask >>= 1;
            mask |= 128;
        }
        return mask;
    }

    /*
     * Apply posterization to the input data
     */
    imageproc.posterization = function(inputData, outputData,
                                       redBits, greenBits, blueBits) {
        console.log("Applying posterization!!");

        var redLevels = Math.pow(2, redBits);
        var greenLevels = Math.pow(2, greenBits);
        var blueLevels = Math.pow(2, blueBits);

        var redMask = Math.floor(256 / redLevels) - 1;
        var greenMask = Math.floor(256 / greenLevels) - 1; 
        var blueMask = Math.floor(256 / blueLevels) - 1;

        for (var i = 0; i < inputData.data.length; i += 4) {
            var rQuant = Math.floor(inputData.data[i] / (256 / redLevels)) * redMask;
            var gQuant = Math.floor(inputData.data[i + 1] / (256 / greenLevels)) * greenMask;
            var bQuant = Math.floor(inputData.data[i + 2] / (256 / blueLevels)) * blueMask;
            
            outputData.data[i]     = rQuant;
            outputData.data[i + 1] = gQuant;
            outputData.data[i + 2] = bQuant;
        }
    }

    /*
     * Apply threshold to the input data
     */
    imageproc.threshold = function(inputData, outputData, thresholdValue) {
        console.log("Applying thresholding...");

        /**
         * TODO: You need to create the thresholding operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Find the grayscale value using simple averaging
            var grayscale = (inputData.data[i] + inputData.data[i+1] + inputData.data[i+2])/3.0; 

            // You will apply thresholding on the grayscale value
            
            // Change the colour to black or white based on the given threshold

            if (grayscale < thresholdValue){
                inputData.data[i] = inputData.data[i+1] = inputData.data[i+2] = 255;
            }else{
                inputData.data[i] = inputData.data[i+1] = inputData.data[i+2] = 0;

            }

            outputData.data[i]     = inputData.data[i];
            outputData.data[i + 1] = inputData.data[i + 1];
            outputData.data[i + 2] = inputData.data[i + 2];
        }
    }

    /*
     * Build the histogram of the image for a channel
     */
    function buildHistogram(inputData, channel) {
        var histogram = [];
        for (var i = 0; i < 256; i++){
            //histogram[i] = 0;
            if (channel == "red"){
                histogram[i] = inputData.data[i];
            }

        }

        /**
         * TODO: You need to build the histogram here
         */

        // Accumulate the histogram based on the input channel
        // The input channel can be:
        // "red"   - building a histogram for the red component
        // "green" - building a histogram for the green component
        // "blue"  - building a histogram for the blue component
        // "gray"  - building a histogram for the intensity
        //           (using simple averaging)

        return histogram;
    }

    /*
     * Find the min and max of the histogram
     */
    function findMinMax(histogram, pixelsToIgnore) {
        var min = 0, max = 255;

        /**
         * TODO: You need to build the histogram here
         */

        // Find the minimum in the histogram with non-zero value by
        // ignoring the number of pixels given by pixelsToIgnore
       
        // Find the maximum in the histogram with non-zero value by
        // ignoring the number of pixels given by pixelsToIgnore
        
        return {"min": min, "max": max};
    }

    /*
     * Apply automatic contrast to the input data
     */
    imageproc.autoContrast = function(inputData, outputData, type, percentage) {
        console.log("Applying automatic contrast...");

        // Find the number of pixels to ignore from the percentage
        var pixelsToIgnore = (inputData.data.length / 4) * percentage;

        var histogram, minMax;
        if (type == "gray") {
            // Build the grayscale histogram
            histogram = buildHistogram(inputData, "gray");

            // Find the minimum and maximum grayscale values with non-zero pixels
            minMax = findMinMax(histogram, pixelsToIgnore);

            var min = minMax.min, max = minMax.max, range = max - min;

            /**
             * TODO: You need to apply the correct adjustment to each pixel
             */

            for (var i = 0; i < inputData.data.length; i += 4) {
                // Adjust each pixel based on the minimum and maximum values

                outputData.data[i]     = inputData.data[i];
                outputData.data[i + 1] = inputData.data[i + 1];
                outputData.data[i + 2] = inputData.data[i + 2];
            }
        }
        else {

            /**
             * TODO: You need to apply the same procedure for each RGB channel
             *       based on what you have done for the grayscale version
             */

            for (var i = 0; i < inputData.data.length; i += 4) {
                // Adjust each channel based on the histogram of each one

                outputData.data[i]     = inputData.data[i];
                outputData.data[i + 1] = inputData.data[i + 1];
                outputData.data[i + 2] = inputData.data[i + 2];
            }
        }
    }

}(window.imageproc = window.imageproc || {}));
