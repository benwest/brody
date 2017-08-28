var m = require('mithril');
var redraw = require('./redraw');

var viewport = {
    
    w: window.innerWidth,
    
    h: window.innerHeight,
    
    st: window.pageYOffset
    
}

window.addEventListener( 'resize', () => {
    
    viewport.w = window.innerWidth;
    
    viewport.h = window.innerHeight;
    
    redraw( true, 'window' );
    
})

window.addEventListener( 'scroll', () => {
    
    viewport.st = window.pageYOffset;
    
    redraw( true, 'scroll' );
    
})

module.exports = viewport;