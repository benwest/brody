var vec2 = require('gl-vec2');
var fit = require('./utils/fit')
var range = require('lodash/range');

module.exports = ({
    attrs: { depth, backgroundColor, backgroundImage, layers },
    state: { viewport, mouse, lazyMouse, clipSize, clipOffset, textures, tools }
}) => {
    
    var center = vec2.scale( [], clipSize, .5 );
    
    var d = Math.min( viewport[ 0 ], viewport[ 1 ] ) * depth * .25;
    
    var m = vec2.divide( [], lazyMouse(), viewport );
    vec2.scale( m, m, 2 );
    vec2.subtract( m, m, [ 1, 1 ] );
    
    var count = layers.length + ( backgroundImage ? 1 : 0 );
    
    var draw = ( file, i, cover ) => {
        
        var parallax = ( ( count - i ) / count ) * d;
        
        var size = vec2.create();
        
        if ( cover ) {
            
            vec2.add( size, viewport, vec2.fromValues( parallax * 2, parallax * 2 ) );
            
        } else {
            
            vec2.copy( size, clipSize );
            
        }
        
        size = fit( [], vec2.fromValues( file.w, file.h ), size, cover ? 'cover' : 'contain' );
        
        var offset = vec2.subtract( [], center, vec2.scale( [], size, .5 ) );
        
        vec2.add( offset, offset, vec2.scale( [], m, parallax ) );
        
        tools.texture({
            size, offset,
            texture: textures( file, size ),
            alpha: 1
        })
        
    }
    
    tools.color({
        offset: [ 0, 0 ],
        size: viewport,
        color: backgroundColor
    })
    
    if ( backgroundImage ) {
        
        draw( backgroundImage, 0, true );
        
    }
    
    layers.forEach( ( file, i ) => draw( file, backgroundImage ? i + 1 : i ) );
    
}