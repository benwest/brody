var base = require('./base');
var mergeWith = require('lodash/mergeWith');

var color = require('./color');
var texture = require('./texture');

var tool = ( props, context ) => {
    
    var command = mergeWith( {}, props, base, ( _, value ) => {
        
        if ( typeof value !== 'string' ) return;
        
        var prefix = [ 'prop', 'context' ].find( prefix => {
            
            return value.startsWith( prefix + ':');
            
        });
        
        if ( !prefix ) return;
        
        var fn = context[ prefix ];
        
        return fn( value.replace( prefix + ':', '' ) );
        
    });
    
    return context( command );
    
}

module.exports = context => {
    
    return {
        
        color: tool( color, context ),
        
        texture: tool( texture, context )
        
    }

}