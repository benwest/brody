var { float } = require('./primitives');

var types = require('./types');

var type = x => {
    
    // constructors
    for ( var key in types ) {
        if ( x === types[ key ] ) return key;
    }
    
    if ( !( type in x ) ) return undefined;
    
    return x.type;
    
}

var assertType = ( x, ...types ) => {
    
    var t = type( x )
    
    if ( types.some( type => type === t ) ) return true;
    
    throw new Error(`Expected ${ type }, got ${ t }`);
    
}

var wrapNumber = x => typeof x === 'number' ? float( x ) : x;

module.exports = { type, assertType };