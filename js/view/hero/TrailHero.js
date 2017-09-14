var m = require('mithril');
var { BackgroundImage } = require('../modules/Image');
var rAF = require('../utils/rAF');
var redraw = require('../utils/redraw');
var styles = require('./styles');
var mouse = require('./input');
var range = require('lodash/range');

var LAYERS = 10;
var lerp = ( a, b, t ) => a + ( b - a ) * t;

module.exports = {
    
    oncreate: ({ state, dom }) => {
        
        var { width, height } = dom.getBoundingClientRect();
        
        var center = [ width / 2, height / 2 ];
        
        state.mouse = mouse( .1, center )
        
        state.positions = range( LAYERS ).map( _ => center );
        
        state.frame = rAF.start( redraw );
        
    },
    
    onremove: ({ state }) => {
        
        rAF.stop( state.frame );
        
    },
    
    onupdate: ({ dom, state }) => {
        
        state.rect = dom.getBoundingClientRect();
        
        var prev = state.mouse.get();
        
        state.positions = state.positions.map( position => {
            
            var p = [
                lerp( position[ 0 ], prev[ 0 ], .1 ),
                lerp( position[ 1 ], prev[ 1 ], .1 )
            ]
            
            prev = p;
            
            return p;
            
        })
        
    },
    
    view: ({
        attrs: { layers, url, backgroundColor, backgroundImage, depth, scale, overlay },
        state: { mouse, rect, positions }
    }) => {
        
        var children = [];
        
        if ( rect ) {
            
            if ( backgroundImage ) {
                
                children.push( <BackgroundImage file={ backgroundImage }/> )
                
            }
            
            var size = [
                rect.width * scale,
                rect.height * scale
            ];
            
            children = children.concat( positions.map( ( [ x, y ], i ) => {
                
                var z = Math.pow( 1 - depth * .1, i );
                
                x = ( x - rect.width / 2 ) * z + ( rect.width / 2 );
                y = ( y - rect.height / 2 ) * z + ( rect.height / 2 );
                
                var layer = layers[ i % layers.length ];
                
                var style = {
                    width: size[ 0 ] * z + 'px',
                    height: size[ 1 ] * z + 'px',
                    transform: `translate(${ x }px, ${ y }px) translate(-50%, -50%)`
                }
                
                return <BackgroundImage style={ style } fit={ 'contain' } file={ layer }/>
                
            }).reverse() )
            
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