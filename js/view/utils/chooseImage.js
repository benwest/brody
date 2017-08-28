var loadImage = require('./loadImage');
var redraw = require('./redraw');

var cache = {};
var load = src => loadImage( src ).then( img => {
    
    cache[ src ] = true;
    
    redraw( false, 'image load' );
    
    return img;
    
});

var DPR = window.devicePixelRatio;

var bigger = ( destW, destH ) => ({ w, h }) => w >= destW && h >= destH;

var bigEnough = ( file, rect ) => {
    
    var i = file.srcs.findIndex( bigger( rect.width * DPR, rect.height * DPR ) );
    
    if ( i === -1 ) i = file.srcs.length - 1;
    
    return i;
    
}

module.exports = ( file, rect ) => {
    
    var correct = bigEnough( file, rect );
    
    var biggestLoaded = file.srcs.findIndex( src => cache[ src.url ] );
    
    if ( biggestLoaded < correct ) {
        
        load( file.srcs[ correct ].url );
        
    }
    
    return biggestLoaded;
    
}