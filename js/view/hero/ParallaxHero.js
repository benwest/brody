var m = require('mithril');
var { BackgroundImage } = require('../modules/Image');
var rAF = require('../utils/rAF');
var redraw = require('../utils/redraw');
var styles = require('./styles');
var mouse = require('./input');

module.exports = {
    
    oninit: ({ state }) => {
        
        state.mouse = mouse([ .1 ]);
        
        state.frame = rAF.start( redraw );
        
    },
    
    onremove: ({ state }) => {
        
        rAF.stop( state.frame );
        
    },
    
    onupdate: ({ dom, state }) => {
        
        state.rect = dom.getBoundingClientRect();
        
    },
    
    view: ({
        attrs: { layers, url, backgroundColor, backgroundImage, depth },
        state: { mouse, rect }
    }) => {
        
        var children = [];
        
        if ( rect ) {
            
            var mousePx = mouse.get();
            
            var mouseRelative = [
                ( mousePx[ 0 ] / rect.width ) * 2 - 1,
                ( mousePx[ 1 ] / rect.height ) * 2 - 1
            ]
            
            var maxOffset = Math.min( rect.width, rect.height ) * .125 * depth;
            
            if ( backgroundImage ) {
                
                var backgroundImageStyle = {
                    width: rect.width + maxOffset * 2 + 'px',
                    height: rect.height + maxOffset * 2 + 'px',
                    transform: `translate(${ ( -mouseRelative[ 0 ] - 1 ) * maxOffset }px, ${ ( -mouseRelative[ 1 ] - 1 ) * maxOffset }px)`
                }
                
                children.push( <BackgroundImage style={ backgroundImageStyle } file={ backgroundImage }/> )
                
            }
            
            children = children.concat( layers.map( ( layer, i ) => {
                
                var offset = maxOffset * ( ( layers.length - i ) / layers.length );
                
                var x = -mouseRelative[ 0 ] * offset;
                var y = -mouseRelative[ 1 ] * offset;
                
                var style = {
                    transform: `translate( ${ x }px, ${ y }px )`
                }
                
                return <BackgroundImage file={ layer } fit={ 'contain' } style={ style }/>
                
            }))
            
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