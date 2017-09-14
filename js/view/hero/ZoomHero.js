var m = require('mithril');
var j2c = require('mithril-j2c');
var { BackgroundImage } = require('../modules/Image');
var rAF = require('../utils/rAF');
var redraw = require('../utils/redraw');
var styles = require('./styles');
var mouse = require('./input');

var len = v => Math.sqrt( Math.pow( v[ 0 ], 2 ) + Math.pow( v[ 1 ], 2 ) );

module.exports = {
    
    oncreate: ({ dom, state }) => {
        
        var { width, height } = dom.getBoundingClientRect();
        
        var center = [ width / 2, height / 2 ];
        
        state.mouse = mouse( .1, center )
        
        state.frame = rAF.start( redraw );
        
    },
    
    onremove: ({ state }) => {
        
        rAF.stop( state.frame );
        
    },
    
    onupdate: ({ dom, state }) => {
        
        state.rect = dom.getBoundingClientRect();
        
    },
    
    view: ({
        attrs: { url, backgroundColor, backgroundImage, zoomingImage, overlay },
        state: { mouse, rect, positions }
    }) => {
        
        var children = [];
        
        if ( rect ) {
            
            if ( backgroundImage ) {
            
                children.push( <BackgroundImage file={ backgroundImage } /> );
            
            }
            
            var mouse = mouse.get();
            
            var center = [ rect.width / 2, rect.height / 2 ];
            var p = [ mouse[ 0 ] - center[ 0 ], mouse[ 1 ] - center[ 1 ] ];
            var scale = ( Math.pow( ( len( p ) / len( center ) ), 3 ) ) * 2 + 1;
            
            var style = {
                transform: `translate(${ p[ 0 ] }px, ${ p[ 1 ] }px ) scale( ${ scale }, ${ scale })`
            }
            
            children.push( <BackgroundImage style={ style } file={ zoomingImage } fit='contain'/>)
            
            if ( overlay ) {
                
                children.push( <BackgroundImage file={ overlay } fit='contain'/> )
                
            }
            
        }
        
        if ( url ) {
            return (
                <a href={ url } oncreate={ m.route.link } class={ styles.background } onmousemove={ mouse && mouse.update } style={ { background: backgroundColor } }>
                    { children }
                </a>
            )
        } else {
            return (
                <div class={ styles.background } onmousemove={ mouse && mouse.update } style={ { background: backgroundColor } }>
                    { children }
                </div>
            )
        }
        
    }
    
}