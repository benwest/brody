var m = require('mithril');
var j2c = require('mithril-j2c');
var keyframes = require('../utils/keyframes');
var viewport = require('../utils/viewport');
var breakpoints = require('../utils/breakpoints');
var { baseline, imageWidths } = require('../utils/metrics');
var Fixer = require('./Fixer');
var Visual = require('./Visual');

var styles = j2c.attach({
    '.layer': {
        top: '50%',
        left: '50%',
        contain: 'strict'
    }
})

module.exports = {
    
    oninit: ({
        state,
        attrs: { files, width, direction, fit }
    }) => {
        
        var layers = files.map( ( file, i ) => {
            
            var from, to;
            
            if ( direction === 'left' ) {
                
                from = i;
                to =  i - ( files.length - 1 )
                
            } else {
                
                from = -i;
                to = -i + files.length - 1;
                
            }
            
            var x = keyframes([
                [ 0, from ],
                [ files.length - 1, to ]
            ])
            
            return { file, x }
            
        });
        
        state.getContent = ( progress, fixed ) => {
            
            var w = viewport.w * breakpoints.switch( imageWidths[ width ] ) / 12;
            
            var p = progress / w;
            
            var margin = fit === 'contain' ? baseline() : 0;
            
            return layers.map( ({ file, x }, i ) => {
                
                var style = {
                    width: ( w - margin * 2 ) + 'px',
                    height: ( viewport.h - margin * 2 ) + 'px',
                    transform: `translate(-50%, -50%) translateX(${ x( p ) * w }px)`,
                    position: fixed ? 'fixed' : 'absolute'
                }
                
                return (
                    <div class={ styles.layer } style={ style } key={ i }>
                        <Visual file={ file } fit={ fit }/>
                    </div>
                );
                
            })
            
        }
        
    },
    
    view: ({
        state: { getContent },
        attrs: { files, width }
    }) => {
        
        var w = viewport.w * breakpoints.switch( imageWidths[ width ] ) / 12;
        
        return (
            <Fixer
                width={ viewport.w }
                height={ viewport.h }
                scrollHeight={ w * ( files.length - 1 ) }
                getContent={ getContent }
            />
        )
        
    }
    
};