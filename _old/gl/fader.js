var fillScreen = require( './fillScreen' );
var frag = require('./fader.glsl');

var defaultUniforms = {
    background: [ 0, 0, 0, 0 ],
    contain: false
}

var writeDefines = defines => Object.keys( defines ).map( key => {
    return `#define ${ key } ${ defines[ key ] }`;
}).join('\n');

var props = ( regl, defaults ) => {
    
    return Object.keys( defaults ).reduce( ( props, key ) => {
        
        var value = defaults[ key ];
        
        props[ key ] = typeof value === 'function' ? value : regl.prop( key );
        
        return props;
        
    }, {} )
    
}

var expandArrayUniform = ( name, props ) => {
    
    return Object.keys( props ).reduce( ( expanded, key ) => {
        
        if ( key === name ) {
            
            props[ key ].forEach( ( value, i ) => {
                
                expanded[ key + '.' + i ] = value;
                
            });
            
        } else {
            
            expanded[ key ] = props[ key ];
            
        }
        
        return expanded;
        
    }, {} );
    
}

module.exports = ( regl, defines ) => {
    
    var gradientPoints = Array( defines.gradientCount ).fill( [ 0, 0 ] );
    
    var defaults = Object.assign(
        expandArrayUniform( 'gradientPoints', { gradientPoints } ),
        { gradientPoints },
        defaultUniforms,
        defines.use_texture ? { texture: null } : {}
    );
    
    var config = {
        
        frag: writeDefines( defines ) + '\n' + frag,
        
        uniforms: props( regl, defaults )
        
    }
    
    var draw = regl( Object.assign( {}, fillScreen, config ) );
    
    return ( props = {} ) => {
        
        var expanded = expandArrayUniform( 'gradientPoints', props );
        // var expanded = {};
        
        var merged = Object.assign( {}, defaults, expanded );
        
        return draw( merged );
        
    }
    
}