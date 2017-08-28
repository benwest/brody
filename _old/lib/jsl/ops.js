var { wrapNumber } = require( 'utils' );

var op = symbol => {
    
    var ctor = ( ...args ) => {
        
        if ( args.length > 2 ) {
            
            return ctor( ctor( args.slice( 0, -1 ) ), args[ args.length - 1 ] );
            
        }
        
        
        
    }
    
    return ctor;
    
}

module.exports = {
    add: op('+'),
    subtract: op('-'),
    multiply: op('*'),
    divide: op('/')
};