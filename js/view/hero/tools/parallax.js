var vec2 = require('gl-vec2');

module.exports = ( depth, clipSize, viewport ) => {
    
    var center = vec2.scale( [], clipSize, .5 );
    
    var d = Math.min( viewport[ 0 ], viewport[ 1 ] ) * depth * .1;
    
    return ( z, mouse, ratio, fit ) => {
        
        var m = vec2.divide( [], mouse, viewport );
        
        vec2.scale( m, m, 2 );
        
        vec2.subtract( m, m, [ 1, 1 ] );
        
        var parallax = z * d;
        
        var size = vec2.create();
        
        if ( fit === 'cover' ) {
            
            vec2.add( size, viewport, vec2.fromValues( parallax * 2, parallax * 2 ) );
            
        } else {
            
            vec2.copy( size, clipSize );
            
        }
        
        size = fit( [], vec2.fromValues( 1, ratio ), size, fit );
        
    }
    
}

module.exports = layers => {
    
    var center = vec2.scale( [], clipSize, .5 );
    
    var d = Math.min( viewport[ 0 ], viewport[ 1 ] ) * depth * .1;
    
    var m = vec2.divide( [], lazyMouse(), viewport );
    vec2.scale( m, m, 2 );
    vec2.subtract( m, m, [ 1, 1 ] );
    
    return layers.map( ( { uniforms, attrs }, i ) => {
        
        var parallax = ( layers.length - i ) * d;
        
        var size = vec2.create();
        
        if ( attrs.fit === 'cover' ) {
            
            vec2.add( size, viewport, vec2.fromValues( parallax * 2, parallax * 2 ) );
            
        } else {
            
            vec2.copy( size, clipSize );
            
        }
        
        size = fit( [], vec2.fromValues( 1, attrs.ratio ), size, attrs.fit );
        
        var offset = vec2.subtract( [], center, vec2.scale( [], size, .5 ) );
        
        vec2.add( offset, offset, vec2.scale( [], m, parallax ) );
        
        return {
            size,
            offset,
            texture: attrs.texture,
            alpha: 1
        };
        
    });
    
}