var m = require('mithril');
var rAF = require('./rAF');
// var throttle = require('lodash/throttle');

// var redrawing = false;

// var redraw = throttle( id => {
    
//     if ( redrawing ) console.warn('AWOOGA');
//     console.log('redrawing ', id );
    
//     redrawing = true;
//     m.redraw();
//     redrawing = false;
    
// }, 100, { leading: false } );

// module.exports = ( force, id ) => {
    
//     redraw( id );
    
//     if ( id === undefined ) debugger
    
//     if ( force ) {
//         redraw.flush();
//     }
    
// }

var requested = false;

var ids = [];

module.exports = id => {
    
    ids.push( id );
    
    if ( !requested ) {
        
        requested = true;
        
        rAF.once(() => {
            // console.log( 'redraw', ...ids );
            requested = false;
            ids = [];
            m.redraw();
        })
        
    }
    
}