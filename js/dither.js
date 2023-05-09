(function(imageproc) {
  "use strict";

  /*
   * Apply ordered dithering to the input data
   */
  imageproc.dither = function(inputData, outputData, matrixType) {

    switch(matrixType) {
      case "error":
        console.log("to posterization but not reallyyyg");
        var result;
        var step = 255/7;
        console.log(outputData);

        var redBits = 3;
        var greenBits = 3;
        var blueBits = 3;

        var redLevels = Math.pow(2,redBits);
        var greenLevels = Math.pow(2,greenBits);
        var blueLevels = Math.pow(2,blueBits);

        var redMask = Math.floor(256/redLevels) - 1;
        var greenMask = Math.floor(256/greenLevels) - 1; 
        var blueMask = Math.floor(256/blueLevels) - 1;

        var errorBufferR = new Array(inputData.width);
        for (var x = 0; x < inputData.width; x++) {
          errorBufferR[x] = new Array(inputData.height).fill(0);
        }

        var errorBufferG = new Array(inputData.width);
        for (var x = 0; x < inputData.width; x++) {
          errorBufferG[x] = new Array(inputData.height).fill(0);
        }

        var errorBufferB = new Array(inputData.width);
        for (var x = 0; x < inputData.width; x++) {
          errorBufferB[x] = new Array(inputData.height).fill(0);
        }

          for (var y = 0; y < inputData.height; y++) {
              for (var x = 0; x < inputData.width; x++) {


                var pixel = imageproc.getPixel(inputData, x, y);
                var rQuant = Math.floor(pixel.r / (256/redLevels))*redMask - errorBufferR[x][y];
                var gQuant = Math.floor(pixel.g / (256/greenLevels))*greenMask - errorBufferG[x][y];
                var bQuant = Math.floor(pixel.b / (256/blueLevels))*blueMask - errorBufferB[x][y];

                var i = (x + y * outputData.width) * (4);
                outputData.data[i] = rQuant;
                outputData.data[i + 1] = gQuant;
                outputData.data[i + 2] = bQuant;

                var errorR = rQuant - pixel.r;
                var errorG = gQuant - pixel.g;
                var errorB = bQuant - pixel.b;

                //var errorR = pixel.r - rQuant;  //this one is better?
                //var errorG = pixel.g - gQuant;
                //var errorB = pixel.b - bQuant;

                if(x < inputData.width - 1){
                    errorBufferR[x+1][y] +=errorR*(7.0/16);
                    errorBufferG[x+1][y] +=errorG*(7.0/16);
                    errorBufferB[x+1][y] +=errorB*(7.0/16);
                }

                if(x > 0 && y < inputData.height - 1){
                    errorBufferR[x-1][y-1] +=errorR*(3.0/16);
                    errorBufferG[x-1][y-1] +=errorG*(3.0/16);
                    errorBufferB[x-1][y-1] +=errorB*(3.0/16);
                }

                if(y < inputData.height - 1){
                    errorBufferR[x][y+1] +=errorR*(5.0/16);
                    errorBufferG[x][y+1] +=errorG*(5.0/16);
                    errorBufferB[x][y+1] +=errorB*(5.0/16);
                }

                if(x < inputData.width - 1 && y < inputData.height - 1){
                    errorBufferR[x+1][y+1] +=errorR*(1.0/16);
                    errorBufferG[x+1][y+1] +=errorG*(1.0/16);
                    errorBufferB[x+1][y+1] +=errorB*(1.0/16);
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
