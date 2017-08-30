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
        position: 'absolute',
        top: '50%',
        left: '50%'
    }
})

var directions = {
    up: [ 0, -1 ],
    down: [ 0, 1 ],
    left: [ -1, 0 ],
    right: [ 1, 0 ]
}

var horizontal = direction => direction === 'left' || direction === 'right';

module.exports = {
    
    oninit: ({
        state,
        attrs: { order, direction, files, inset, fit }
    }) => {
        
        var off = directions[ direction ];
        var on = [ 0, 0 ];
        
        var from, to, startTime;
        
        if ( order === 'up' ) {
            from = off;
            to = on;
            startTime = 0;
        } else {
            from = on;
            to = off;
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
        
        if ( order === 'down' ) layers = reverse( layers );
        
        state.getContent = progress => {
            
            var p = progress / ( horizontal( direction ) ? viewport.w : viewport.h );
            
            var ins = inset ? baseline( breakpoints.get( viewport.w ) ) : 0;
            
            var w = viewport.w;
            var h = viewport.h;
            
            return layers.map( ({ file, x, y }) => {
                
                w -= ins * 2;
                h -= ins * 2;
                
                var x = x( p ) * viewport.w;
                var y = y( p ) * viewport.h;
                
                var style = {
                    width: w + 'px',
                    height: h + 'px',
                    transform: `translate(-50%, -50%) translate(${ x }px, ${ y }px)`
                }
                
                return (
                    <div class={ styles.layer } style={ style }>
                        <Visual file={ file } fit={ fit }/>
                    </div>
                )
                
            })
            
        }
        
    },
    
    view: ({
        state: { getContent },
        attrs: { files, direction, order }
    }) => {
        
        var pageSize = horizontal( direction ) ? viewport.w : viewport.h;
        
        return (
            <Fixer
                width={ viewport.w }
                height={ viewport.h }
                scrollHeight={ pageSize * files.length }
                getContent={ getContent }
            />
        )
        
    }
    
}