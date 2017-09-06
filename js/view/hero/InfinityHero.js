var vec2 = require('gl-vec2');
var fit = require('./utils/fit')
var range = require('lodash/range');

module.exports = ({
    attrs: { depth, feather, scale, backgroundColor, backgroundImage, layers },
    state: { viewport, mouse, lazyMouse, clipSize, clipOffset, textures, tools }
}) => {
    
    var center = vec2.scale( [], clipSize, .5 );
    
    var d = Math.max( viewport[ 0 ], viewport[ 1 ] ) * depth;
    
    var count = 30 + ( backgroundImage ? 1 : 0 );
    
    var draw = ( i, cover ) => {
        
        var m = vec2.divide( [], lazyMouse( 1 - i / count ), viewport );
        vec2.scale( m, m, 2 );
        vec2.subtract( m, m, [ 1, 1 ] );
        
        var file = layers[ i % layers.length ];
        
        var parallax = ( ( i - count / 2 ) / count ) * d;
        
        var size = vec2.create();
        
        if ( cover === true ) {
            
            vec2.add( size, viewport, vec2.fromValues( parallax * 2, parallax * 2 ) );
            
        } else {
            
            vec2.copy( size, clipSize );
            
        }
        
        size = fit( [], vec2.fromValues( file.w, file.h ), size, cover === true ? 'cover' : 'contain' );
        
        vec2.scale( size, size, scale );
        
        var offset = vec2.subtract( [], center, vec2.scale( [], size, .5 ) );
        
        vec2.add( offset, offset, vec2.scale( [], m, parallax ) );
        
        tools.texture({
            size, offset,
            texture: textures( file, size ),
            alpha: i / count
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
    
    range( count ).forEach( draw );
    
}