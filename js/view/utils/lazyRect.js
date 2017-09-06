var m = require('mithril');
var throttle = require('lodash/throttle');
var redraw = require('./redraw');

var cache = {};
var id = 0;

var equal = ( r1, r2 ) => {
    
    return (
        r1.top === r2.top &&
        r1.left === r2.left &&
        r1.width === r2.width &&
        r1.height === r2.height
    )
    
}

var check = throttle( () => {
    
    var changed = false;
    
    for ( var id in cache ) {
        
        var { dom, rect: prevRect } = cache[ id ];
        
        var nextRect = dom.getBoundingClientRect();
        
        changed = changed || !equal( prevRect, nextRect );
        
        cache[ id ].rect = nextRect;
      
    }
    
    if ( changed ) redraw( 'lazyboy' );
    
}, 300 )

window.addEventListener( 'resize', check );
window.addEventListener( 'scroll', check, true );

module.exports = {
    
    subscribe: dom => {
        
        cache[ ++id ] = { dom, rect: false };
        
        return id;
        
    },
    
    get: id => {
        
        var cached = cache[ id ];
        
        if ( cached.rect === false ) {
            
             cached.rect = cached.dom.getBoundingClientRect();
             
             redraw( 'lazyboy' );
            
        }
        
        return cached.rect;
        
    },
    
    unsubscribe: id => delete cache[ id ]
    
};