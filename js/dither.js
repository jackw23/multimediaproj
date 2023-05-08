(function(imageproc) {
  "use strict";

  /*
   * Apply ordered dithering to the input data
   */
  imageproc.dither = function(inputData, outputData, matrixType) {

    switch(matrixType) {
      case "error":
        console.log("error diffusion");
        var error = 0;
        var threshold = 128;
        var result;

        var errorBuffer = new Array(inputData.width);
        for (var x = 0; x < inputData.width; x++) {
          errorBuffer[x] = new Array(inputData.height).fill(0);
        }
          for (var y = 0; y < inputData.height; y++) {
              for (var x = 0; x < inputData.width; x++) {
                  var pixel = imageproc.getPixel(inputData, x, y);
                  var grayscale = (pixel.r + pixel.g + pixel.b) / 3;
                  grayscale = grayscale - errorBuffer[x][y];
                  var result = grayscale < threshold ? 0 : 255;

                  var i = (x + y * outputData.width) * (4);
                  outputData.data[i] = result;
                  outputData.data[i + 1] = result;
                  outputData.data[i + 2] = result;

                  error = grayscale - result;
                  
                  if(x < inputData.width - 1){
                      errorBuffer[x + 1][y] -= error * (7.0/16);
                  }

                  if(x > 0 && y < inputData.height - 1){
                      errorBuffer[x-1][y+1] -= error * (3.0/16);
                  }
                  
                  if(y < inputData.height - 1){
                      errorBuffer[x][y+1] -= error * (5.0/16);
                  }

                  if(x < inputData.width - 1 && y < inputData.height - 1){
                      errorBuffer[x+1][y+1] -= error * (1.0/16);
                  }
              }
          }
        break;
      case "poster":
        console.log("to posterization");
        var result;
        var step = 255/7;

        var errorBuffer = new Array(inputData.width);
        for (var x = 0; x < inputData.width; x++) {
          errorBuffer[x] = new Array(inputData.height).fill(0);
        }

          for (var y = 0; y < inputData.height; y++) {
              for (var x = 0; x < inputData.width; x++) {
                  var pixel = imageproc.getPixel(inputData, x, y);
                  var grayscale = (pixel.r + pixel.g + pixel.b) / 3;
                  grayscale = grayscale - errorBuffer[x][y];

                  var level = Math.round(grayscale/step) * step;
                  if (level > 255) {
                    result = 255;
                  } else if (level < 0) {
                    result = 0;
                  } else {
                    result = level;
                  }

                  var i = (x + y * outputData.width) * (4);
                  outputData.data[i] = result;
                  outputData.data[i + 1] = result;
                  outputData.data[i + 2] = result;

                  var error = grayscale - result;
                  
                  if(x < inputData.width - 1){
                      errorBuffer[x + 1][y] -= error * (7.0/16);
                  }

                  if(x > 0 && y < inputData.height - 1){
                      errorBuffer[x-1][y+1] -= error * (3.0/16);
                  }
                  
                  if(y < inputData.height - 1){
                      errorBuffer[x][y+1] -= error * (5.0/16);
                  }

                  if(x < inputData.width - 1 && y < inputData.height - 1){
                      errorBuffer[x+1][y+1] -= error * (1.0/16);
                  }
              }
          }
        break;
    }

  }

}(window.imageproc = window.imageproc || {}));
