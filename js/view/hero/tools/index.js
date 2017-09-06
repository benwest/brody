var base = require('./base');
var mergeWith = require('lodash/mergeWith');

var color = require('./color');
var texture = require('./texture');

var tool = ( props, regl ) => {
    
    var command = mergeWith( {}, props, base, ( _, value ) => {
        
        if ( typeof value !== 'string' ) return;
        
        var prefix = [ 'prop', 'context' ].find( prefix => {
            
            return value.startsWith( prefix + ':');
            
        });
        
        if ( !prefix ) return;
        
        var fn = regl[ prefix ];
        
        return fn( value.replace( prefix + ':', '' ) );
        
    });
    
    return regl( command );
    
}

module.exports = regl => {
    
    return {
        
        scene: regl({
    
            context: {
                
                viewport: regl.prop('viewport'),
                
                mouse: regl.prop('mouse'),
                
                lazyMouse: regl.prop('lazyMouse'),
                
                clipSize: regl.prop('clipSize'),
                
                clipOffset: regl.prop('clipOffset'),
                
                textures: regl.prop('textures'),
                
                tools: regl.prop('tools')
                
            }
            
        }),
        
        color: tool( color, regl ),
        
        texture: tool( texture, regl )
        
    }

}