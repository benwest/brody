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
    
    redraw( 'window' );
    
})

window.addEventListener( 'scroll', () => {
    
    viewport.st = window.pageYOffset;
    
    redraw( 'scroll' );
    
})

module.exports = viewport;