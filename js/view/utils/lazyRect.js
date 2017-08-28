var m = require('mithril');
var throttle = require('lodash/throttle');
var redraw = require('./redraw');
var viewport = require('./viewport');

var cache = new Map();

var state = Object.assign( {}, viewport );

var equal = ( r1, r2 ) => {
    
    return (
        r1.top === r2.top &&
        r1.left === r2.left &&
        r1.width === r2.width &&
        r1.height === r2.height
    )
    
}

var checkViewport = () => {
    
    var changed = Object.keys( viewport ).some( key => {
        
        return state[ key ] !== viewport[ key ];
        
    })
    
    if ( changed ) Object.assign( state, viewport );
    
    return changed;
    
}

var checkRects = () => {
    
    var changed = false;
    
    for ( var [ dom, prevRect ] of cache ) {
        
        var nextRect = dom.getBoundingClientRect();
        
        changed = changed || !equal( prevRect, nextRect );
        
        cache.set( dom, nextRect );
      
    }
    
    return changed;
    
}

var check = throttle( () => {
    
    var changed = false;
    
    for ( var [ dom, prevRect ] of cache ) {
        
        var nextRect = dom.getBoundingClientRect();
        
        changed = changed || !equal( prevRect, nextRect );
        
        cache.set( dom, nextRect );
      
    }
    
    if ( changed ) redraw( false, 'lazyboy' );
    
}, 250 )

window.addEventListener( 'resize', check );
window.addEventListener( 'scroll', check );

module.exports = {
    
    subscribe: dom => {
        
        cache.set( dom, dom.getBoundingClientRect() );
        
        check();
        
        return () => cache.get( dom )
        
    },
    
    unsubscribe: dom => cache.delete( dom )
    
};