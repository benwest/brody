var m = require('mithril');
var j2c = require('mithril-j2c');
var reverse = require('lodash/reverse');
var keyframes = require('../utils/keyframes');
var viewport = require('../utils/viewport');
var Fixer = require('./Fixer');
var { baseline } = require('../utils/metrics');
var breakpoints = require('../utils/breakpoints');
var Visual = require('./Visual');

var styles = j2c.attach({
    '.layer': {
        top: '50%',
        left: '50%',
        contain: 'strtict'
    }
})

var origin = [ 0, 0 ];

var directions = {
    up: [ 0, -1 ],
    down: [ 0, 1 ],
    left: [ -1, 0 ],
    right: [ 1, 0 ]
}

var add = ( v1, v2 ) => [ v1[ 0 ] + v2[ 0 ], v1[ 1 ] + v2[ 1 ] ];
var sub = ( v1, v2 ) => [ v1[ 0 ] - v2[ 0 ], v1[ 1 ] - v2[ 1 ] ];

var horizontal = direction => direction === 'left' || direction === 'right';

module.exports = {
    
    oninit: ({
        state,
        attrs: { files, direction, order, inset, fit }
    }) => {
        
        var dir = directions[ direction ];
        
        var from, to, startTime;
        
        if ( order === 'enter' ) {
            
            from = sub( origin, dir );
            to = origin;
            startTime = -1;
            
        } else {
            
            from = origin;
            to = add( origin, dir );
            startTime = 0;
            files = reverse( files );
            
        }
        
        var layers = files.map( ( file, i ) => {
            
            var x = keyframes([
                [ startTime + i, from[ 0 ] ],
                [ startTime + i + 1, to[ 0 ] ]
            ]);
            
            var y = keyframes([
                [ startTime + i, from[ 1 ] ],
                [ startTime + i + 1, to[ 1 ] ]
            ]);
            
            return { file, x, y };
            
        });
        
        if ( order === 'exit' ) layers = reverse( layers );
        
        state.getContent = ( progress, fixed ) => {
            
            var p = progress / ( horizontal( direction ) ? viewport.w : viewport.h );
            
            var ins = inset ? baseline() : 0;
            
            var w = viewport.w;
            var h = viewport.h;
            
            return layers.map( ({ file, x, y }, i ) => {
                
                w -= ins * 2;
                h -= ins * 2;
                
                var x = x( p ) * viewport.w;
                var y = y( p ) * viewport.h;
                
                var style = {
                    width: w + 'px',
                    height: h + 'px',
                    transform: `translate(-50%, -50%) translate(${ x }px, ${ y }px)`,
                    position: fixed ? 'fixed' : 'absolute'
                }
                
                return (
                    <div class={ styles.layer } style={ style } key={ i }>
                        <Visual file={ file } fit={ fit }/>
                    </div>
                )
                
            })
            
        }
        
    },
    
    view: ({
        state: { getContent },
        attrs: { files, direction }
    }) => {
        
        var pageSize = horizontal( direction ) ? viewport.w : viewport.h;
        
        return (
            <Fixer
                width={ viewport.w }
                height={ viewport.h }
                scrollHeight={ pageSize * ( files.length - 1 ) }
                getContent={ getContent }
            />
        )
        
    }
    
}