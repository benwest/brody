var supported = true, canvas;

try {
    
    canvas = document.createElement('canvas');
    
    canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
} catch (e) {
    
    supported = false;
  
}

canvas = undefined;

module.exports = supported;