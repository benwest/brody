var m = require('mithril');
var throttle = require('lodash/throttle');

var redrawing = false;

var redraw = throttle( id => {
    
    if ( redrawing ) console.warn('AWOOGA');
    console.log('redrawing ', id );
    
    redrawing = true;
    m.redraw();
    redrawing = false;
    
}, 100, { leading: false } );

module.exports = ( force, id ) => {
    
    redraw( id );
    
    if ( id === undefined ) debugger
    
    if ( force ) {
        redraw.flush();
    }
    
}