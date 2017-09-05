var map = ( list, fn ) => {
    
    var ret = fn( list );
    
    if ( list.children ) {
        
        ret.children = list.children.map( child => map( child, fn ) );
    
    }
    
    return ret;
    
}

var layout = ( list, offset = 0 ) => {
    
    list.children.forEach( ( item, i ) => {
        
        var [ top, right, bottom, left ] = item.margin;
        
        item.width = list.width - ( left + right );
        item.height = list.height - ( top + bottom );
        item.x = left;
        item.y = list.height * i + top;
        
        item.offset = offset;
        
        if ( item.children ) layout( item, offset );
        
        offset += list.height;
        
    });
    
    return list;
    
};

var scroll = ( list, top ) => {
    
    list.scrollTop = 0;
    
    list.children.forEach( ( item, i ) => {
        
        if ( item.type === 'list' ) {
            
            top = scroll( item, top );
            
        }
        
        if ( i < list.children.length - 1 ) {
            
            var d = Math.min( list.height, top );
            list.scrollTop += d;
            top -= d;
        
        }
        
    });
    
    return top;
    
};

var maxScroll = list => {
    
    var ownHeight = list.height * ( list.children.length - 1 );
    
    var childHeight = list.children
        .filter( item => item.type === 'list' )
        .reduce( ( total, item ) => total + maxScroll( item ), 0 );
    
    return ownHeight + childHeight;
    
}

module.exports = { map, layout, scroll, maxScroll };