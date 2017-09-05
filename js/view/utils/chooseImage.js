var loadImage = require('./loadImage');
var redraw = require('./redraw');

var cache = {};
var load = src => loadImage( src ).then( img => {
    
    cache[ src ] = true;
    
    redraw( 'image load' );
    
    return img;
    
});

var DPR = window.devicePixelRatio;

var bigger = ( destW, destH ) => ({ w, h }) => w >= destW && h >= destH;

var bigEnough = ( file, width, height ) => {
    
    var i = file.srcs.findIndex( bigger( width * DPR, height * DPR ) );
    
    if ( i === -1 ) i = file.srcs.length - 1;
    
    return i;
    
}

module.exports = ( file, { width, height } ) => {
    
    var correct = bigEnough( file, width, height );
    
    var biggestLoaded = Math.max( file.srcs.findIndex( src => cache[ src.url ] ), 0 );
    
    if ( biggestLoaded < correct ) {
        
        var src = file.srcs[ correct ].url;
        
        if ( !( src in cache ) ) {
            
            cache[ src ] = false;
            
            load( src );
            
        }
        
    }
    
    return biggestLoaded;
    
}