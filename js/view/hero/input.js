var lerp = ( a, b, t ) => a + ( b - a ) * t;

module.exports = ( lag, initial = [ 0, 0 ] ) => {
    
    var position = initial;
    var target = initial;
    
    var update = e => {
        
        e.redraw = false;
        target = [ e.offsetX, e.offsetY ]
        
    }
    
    var get = () => {
        
        position = [
            lerp( position[ 0 ], target[ 0 ], lag ),
            lerp( position[ 1 ], target[ 1 ], lag )
        ]
        
        return position;
        
    };
    
    return { update, get };
    
}