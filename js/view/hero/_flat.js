var createRegl = require('regl');
var flatten = require('lodash/flatten');

var defaultUniform = type => {
    
    switch ( type ) {
        
        case 'int':
        case 'float':
            return 0;
            
        case 'bool':
            return false;
            
        case 'vec2':
            return new Float32Array( 2 );
            
        case 'vec3':
            return new Float32Array( 3 );
            
        case 'vec4':
            return new Float32Array( 4 );
        
    }
    
}

var defaultUniforms = frag => {
    
    return frag
        .split(';')
        .map( line => line.trim() )
        .filter( line => line.startsWith( 'uniform' ) )
        .reduce( ( uniforms, line ) => {
            
            var [ , type, name ] = line.split(/\s+/);
            
            uniforms[ name ] = defaultUniform( type );
            
            return uniforms;
            
        }, {} )
    
}

var normalizeShader = shader => {
    
    typeof shader === 'string' ? { frag: shader, uniforms: {} } : shader;
    
}

var shaderCommand = ( regl, shader ) => {
    
    var defaults = Object.assign( defaultUniforms( shader.frag ), shader.uniforms );
    
    var uniforms = {};
    
    for ( var key in defaults ) uniforms[ key ] = regl.prop( key );
    
    var command = regl({ frag: shader.frag, uniforms });
    
    return ( uniforms, children ) => {
        
        return command( Object.assign( {}, defaults, uniforms ), drawChildren( children ) );
        
    }
    
}

module.exports = ( options = {} ) => {
    
    var regl = createRegl( options );
    
    var shaders = {};
    
    var draw = () => {
        
        var command, shader, uniforms, children;
        
        if ( typeof arguments[ 0 ] === 'string' ) {
            
            [ shader, uniforms, ...children ] = arguments;
            
        } else if ( typeof arguments[ 0 ] === 'function' ) {
            
            var [ command, uniforms, ...children ] = arguments;
            
        } else {
            
            shader = 'texture' in uniforms ? TextureShader : ColorShader;
            
            [ uniforms, ...children ] = arguments;
            
        }
        
        if ( shader ) {
            
            shader = normalizeShader( shader );
            
            if ( !( shader in shaders ) ) {
                
                shaders[ shader ] = shaderCommand( regl, shader );
                
            }
            
            command = shaders[ shader ];
            
        }
        
        children = flatten( children );
        
        return { command, uniforms, children };
        
    }
    
}