var redraw = require('../utils/redraw');
var rAF = require('../utils/rAF');

var subscribers = 0;

var frame;
var actual;

var MEMORY_LENGTH = 5000;
var memory = [];

var lerp = ( a, b, t ) => a + ( b - a ) * t;
var map = ( x, im, iM, om, oM ) => om + ( x - im ) / ( iM - im ) * ( oM - om );

var subscribe = () => {
    
    if ( subscribers++ === 0 ) {
        
        window.addEventListener( 'mousemove', onmousemove );
        
        frame = rAF.start( tick );
        
    }
    
}

var unsubscribe = () => {
    
    if ( --subscribers === 0 ) {
        
        window.removeEventListener( 'mousemove', onmousemove );
        
        rAF.stop( frame );
        
    }
    
};

var tick = now => {
    
    if ( !actual ) return;
    
    if ( !memory.length ) {
        
        memory[ 0 ] = [ now, actual[ 0 ], actual[ 1 ] ];
    
    } else {
        
        var [ x, y ] = actual;
        var [ , lastX, lastY ] = memory[ 0 ];
        
        memory.unshift([
            now,
            lerp( lastX, x, .1 ),
            lerp( lastY, y, .1 )
        ]);
        
    }
    
    var tooOld = now - MEMORY_LENGTH;
    
    while ( memory.length && memory[ memory.length - 1 ][ 0 ] < tooOld ) memory.pop();
    
};

var get = ( time = Date.now() ) => {
    
    var l = memory.length;
    
    if ( l === 0 ) return [ 0, 0 ];
    
    for ( var i = 0; i < l; i++ ) {
        
        var [ t, x, y ] = memory[ i ];
        
        if ( t <= time ) {
            
            if ( i === 0 ) return [ x, y ];
            
            var [ prevT, prevX, prevY ] = memory[ i - 1 ];
            
            return [
                map( time, prevT, t, prevX, x ),
                map( time, prevT, t, prevY, y ),
            ];
            
        }
        
    }
    
    return memory[ memory.length - 1 ].slice( 1 );
    
}

var onmousemove = e => {
    
    actual = [ e.clientX, e.clientY ];
    
}

module.exports = { subscribe, unsubscribe, get };