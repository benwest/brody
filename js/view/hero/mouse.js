var redraw = require('../utils/redraw');
var rAF = require('../utils/rAF');

var subscribers = 0;

var frame;
var actual;

var MEMORY_LENGTH = 5000;
var memory = [];

var lerp = ( a, b, t ) => a + ( b - a ) * t;

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
    
    var [ x, y ] = actual;
    var [ , lastX, lastY ] = memory[ memory.length - 1 ];
    
    memory.unshift([
        now,
        lerp( lastX, x, .95 ),
        lerp( lastY, y, .95 )
    ]);
    
    var tooOld = now - MEMORY_LENGTH;
    
    while ( memory.length && memory[ memory.length - 1 ][ 0 ] < tooOld ) memory.pop();
    
};

var get = time => {
    
    var l = memory.length;
    
    for ( var i = 0; i < l; i++ ) {
        
        var [ t, x, y ] = memory[ i ];
        
        if ( t <= time ) return [ x, y ];
        
    }
    
    return memory[ memory.length - 1 ].slice( 1 );
    
}

var onmousemove = e => {
    
    actual = [ e.pageX, e.pageY ];
    
}

module.exports = { subscribe, unsubscribe, get };