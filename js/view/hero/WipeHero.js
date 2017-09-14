var m = require('mithril');
var j2c = require('mithril-j2c');
var { BackgroundImage } = require('../modules/Image');
var rAF = require('../utils/rAF');
var redraw = require('../utils/redraw');
var styles = require('./styles');
var mouse = require('./input');
var range = require('lodash/range');

module.exports = {
    
    oncreate: ({ state }) => {
        
        state.mouse = mouse( .1 );
        
        state.frame = rAF.start( redraw );
        
    },
    
    onremove: ({ state }) => {
        
        rAF.stop( state.frame );
        
    },
    
    onupdate: ({ dom, state }) => {
        
        state.rect = dom.getBoundingClientRect();
        
    },
    
    view: ({
        attrs: { url, backgroundColor, back, front, overlay },
        state: { mouse, rect, positions }
    }) => {
        
        var children = [];
        
        if ( rect ) {
            
            children.push( <BackgroundImage file={ back } /> );
            
            var clip = `inset(0 ${ rect.width - mouse.get()[ 0 ] }px 0 0)`;
            
            var frontStyle = {
                'clip-path': clip,
                '-webkit-clip-path': clip
            }
            
            children.push( <BackgroundImage file={ front } style={ frontStyle }/> );
            
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