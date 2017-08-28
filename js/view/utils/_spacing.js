var metrics = require('./metrics');
var atoms = require('./atoms');

var edgeNames = [ 'top', 'right', 'bottom', 'left' ];

var unit = x => x * metrics.baseline + 'px';

var spacing = property => ( ...edges ) => {
    
    if ( edges.length === 1 ) {
        
        var v = edges[ 0 ];
        
        edges = [ v, v, v, v ];
        
    } else if ( edges.length === 2 ) {
        
        var y = edges[ 0 ];
        var x = edges[ 1 ];
        
        edges = [ y, x, y, x ];
        
    }
    
    var props = edges.reduce( ( props, v, i ) => {
        
        props[ property + '-' + edgeNames[ i ] ] = v;
        
        return props;
        
    }, {} );
    
    return atoms( props, unit );
    
}

module.exports = {
    margin: spacing( 'margin' ),
    padding: spacing( 'padding' )
};