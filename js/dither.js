(function(imageproc) {
  "use strict";

  /*
   * Apply ordered dithering to the input data
   */
  imageproc.dither = function(inputData, outputData, matrixType, levels) {
    console.log(levels);

    switch(matrixType) {
      case "error":
        console.log("error diffusion!")
        var resultR;
        var resultG;
        var resultB;
        var errorR = 0;
        var errorG = 0;
        var errorB = 0;

        var redLevels = Math.pow(2, 2);
        var greenLevels = Math.pow(2, 2);
        var blueLevels = Math.pow(2, 2);
      
        var redMask = Math.floor(256 / redLevels) - 1;
        var greenMask = Math.floor(256 / greenLevels) - 1;
        var blueMask = Math.floor(256 / blueLevels) - 1;

        var errorBuffer = new Array(inputData.width);
        for (var x = 0; x < inputData.width; x++) {
          errorBuffer[x] = new Array(inputData.height).fill([0,0,0]);
        }
          for (var y = 0; y < inputData.height; y++) {
              for (var x = 0; x < inputData.width; x++) {
                  var pixel = imageproc.getPixel(inputData, x, y);

                  var levelR = Math.floor(pixel.r / (256 / redLevels)) * redMask;
                  levelR = levelR - errorBuffer[x][y][0];
                  if (levelR > 255) {
                    resultR = 255;
                  } else if (levelR < 0) {
                    resultR = 0;
                  } else {
                    resultR = levelR;
                  }
                  errorR = pixel.r - resultR;

                  var levelG = Math.floor(pixel.g / (256 / greenLevels)) * greenMask;
                  levelG = levelG - errorBuffer[x][y][1];
                  if (levelG > 255) {
                    resultG = 255;
                  } else if (levelG < 0) {
                    resultG = 0;
                  } else {
                    resultG = levelG;
                  }
                  errorG = pixel.g - resultG;

                  var levelB = Math.floor(pixel.b / (256 / blueLevels)) * blueMask;
                  levelB = levelB - errorBuffer[x][y][2];
                  if (levelB > 255) {
                    resultB = 255;
                  } else if (levelB < 0) {
                    resultB = 0;
                  } else {
                    resultB = levelB;
                  }
                  errorB = pixel.b - resultB;

                  var i = (x + y * outputData.width) * (4);
                  outputData.data[i] = resultR;
                  outputData.data[i + 1] = resultG;
                  outputData.data[i + 2] = resultB;
                  outputData.data[i + 3] = 255;
                  
                  if(x < inputData.width - 1){
                      errorBuffer[x+1][y][0] -= errorR * (7.0/16);
                      errorBuffer[x+1][y][1] -= errorG * (7.0/16);
                      errorBuffer[x+1][y][2] -= errorB * (7.0/16);
                  }

                  if(x > 0 && y < inputData.height - 1){
                      errorBuffer[x-1][y+1][0] -= errorR * (3.0/16);
                      errorBuffer[x-1][y+1][1] -= errorG * (3.0/16);
                      errorBuffer[x-1][y+1][2] -= errorB * (3.0/16);
                  }
                  
                  if(y < inputData.height - 1){
                      errorBuffer[x][y+1][0] -= errorR * (5.0/16);
                      errorBuffer[x][y+1][1] -= errorG * (5.0/16);
                      errorBuffer[x][y+1][2] -= errorB * (5.0/16);
                  }

                  if(x < inputData.width - 1 && y < inputData.height - 1){
                      errorBuffer[x+1][y+1][0] -= errorR * (1.0/16);
                      errorBuffer[x+1][y+1][1] -= errorG * (1.0/16);
                      errorBuffer[x+1][y+1][2] -= errorB * (1.0/16);
                  }
              }
          }
        break;
      case "poster":
        console.log("to posterization");
        var result;
        console.log(levels);
        var step = 255/ (levels - 1);

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
                      errorBuffer[x+1][y] -= error * (7.0/16);
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
