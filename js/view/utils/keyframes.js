var map = ( x, inMin, inMax, outMin, outMax ) => {
    
    return outMin + ( x - inMin ) / ( inMax - inMin ) * ( outMax - outMin );
    
}

module.exports = keyframes => {
    
    var l = keyframes.length;
    
    var [ startTime, start ] = keyframes[ 0 ];
    var [ endTime, end ] = keyframes[ l - 1 ];
    
    if ( keyframes.every( ([ time, position ]) => position === start ) ) {
        
        return () => start;
        
    }
    
    return t => {
    
        if ( t <= startTime ) return start;
        if ( t >= endTime ) return end;
        
        var from, to;
        
        for ( var i = 0; i < l; i++ ) {
            
            from = keyframes[ i ];
            
            if ( t < from[ 0 ] ) continue;
            
            to = keyframes[ i + 1 ];
            
            return map( t, from[ 0 ], to[ 0 ], from[ 1 ], to[ 1 ] );
            
        }
    
    }
    
}