var m = require('mithril');
var throttle = require('lodash/throttle');

var redraw = throttle( id => {
    
    console.log('redrawing', id );
    
    m.redraw();
    
}, 0 );

module.exports = ( force, id ) => {
    
    redraw( id );
    
    if ( force ) {
        redraw.flush();
    }
    
}