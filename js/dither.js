(function(imageproc) {
  "use strict";

  /*
   * Apply ordered dithering to the input data
   */
  imageproc.dither = function(inputData, outputData, matrixType) {
      console.log("Applying error dithering!!");

      var error = 0;
      var threshold = 128;
      var result;
      
      console.log("threshold: " + threshold);

      for (var y = 0; y < inputData.height; y++) {
          for (var x = 0; x < inputData.width; x++) {
              var pixel = imageproc.getPixel(inputData, x, y);
              var grayscale = ((pixel.r + pixel.g + pixel.b) / 3) + error;

              var result = grayscale < 200 ? 0 : 255;
              error = grayscale - result;

              var i = (x + y * outputData.width) * (4);

              outputData.data[i] = result;
              outputData.data[i + 1] = result;
              outputData.data[i + 2] = result;
               
              if(x < inputData.width - 1){
                  var ri = ((x+1) + y * outputData.width) * (4);
                  outputData.data[ri]     += (error*(7.0/16));
                  outputData.data[ri + 1] += (error*(7.0/16));
                  outputData.data[ri + 2] += (error*(7.0/16));
              }

              if(x > 0 && y < inputData.height - 1){
                  var ldi = ((x-1) + (y+1) * outputData.width) * (4);
                  outputData.data[ldi]     += (error*(3.0/16));
                  outputData.data[ldi + 1] += (error*(3.0/16));
                  outputData.data[ldi + 2] += (error*(3.0/16));
              }
              
              if(y < inputData.height - 1){
                  var di = (x + (y+1) * outputData.width) * (4);
                  outputData.data[di]     += (error*(5.0/16));
                  outputData.data[di + 1] += (error*(5.0/16));
                  outputData.data[di + 2] += (error*(5.0/16));
              }

              if(x < inputData.width - 1 && y < inputData.height - 1){
                  var rdi = ((x+1) + (y+1) * outputData.width) * (4);
                  outputData.data[rdi]     += (error*(1.0/16));
                  outputData.data[rdi + 1] += (error*(1.0/16));
                  outputData.data[rdi + 2] += (error*(1.0/16));
              }
          }
      }
  }

}(window.imageproc = window.imageproc || {}));