var { float } = require('./primitives');
var { assertType } = require('./utils');

var SWIZZLE_MASKS = [ 'xyzw', 'rgba', 'stpq' ];

var swizzles = ( length, value ) => {
    
    var legalMasks = SWIZZLE_MASKS.map( m => m.slice( 0, length ).split( '' ) );
    
    
    
}

var vecType = length => {
    
    var type = 'vec' + length;
    
    var Ctor = ( ...args ) => {
        
        args = args.map( wrapNumber );
        
        var argLength = args.reduce( ( a, b ) => a + b.length, 1 );
        
        if ( argLength < length ) throw new Error( `Not enough arguments passed to ${type}` );
        if ( argLength > length ) throw new Error( `Too many arguments passed to ${type}` );
        
        return {
            type,
            args,
            ...swizzles( length, value )
        }
        
    }
    
}

var vecs = {
    vec2: vecType( 2 ),
    vec3: vecType( 3 ),
    vec4: vecType( 4 )
}