var m = require('mithril');
var { BackgroundImage } = require('../modules/Image');
var rAF = require('../utils/rAF');
var redraw = require('../utils/redraw');
var styles = require('./styles');
var mouse = require('./input');

module.exports = {
    
    oncreate: ({ dom, state }) => {
        
        state.mouse = mouse( .1 )
        
        state.frame = rAF.start( redraw );
        
    },
    
    onremove: ({ state }) => {
        
        rAF.stop( state.frame );
        
    },
    
    onupdate: ({ dom, state }) => {
        
        state.rect = dom.getBoundingClientRect();
        
    },
    
    view: ({
        attrs: { url, backgroundColor, frames, overlay },
        state: { mouse, rect, positions }
    }) => {
        
        var children = [];
        
        if ( rect ) {
            
            var x = ( mouse.get()[ 0 ] / rect.width ) * ( frames.length - 1 );
            
            children = frames.map( ( file, i ) => {
                
                var opacity = x - i + 1;
                
                return <BackgroundImage style={ { opacity } } file={ file } key={ i }/>
                
            });
            
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