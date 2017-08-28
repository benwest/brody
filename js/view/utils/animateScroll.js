var uniqueId = require('lodash/uniqueId');

var tween = require('./tween');

var running = new WeakMap();

module.exports = ({
    element,
    to,
    duration = 250
}) => {
    
    var name;
    
    if ( running.has( element ) ) {
        
        name = running.get( element );
        
    } else {
        
        name = uniqueId();
        running.set( element, [ name, to ] );
        
    }
    
    return tween({
        name,
        from: element.scrollTop,
        to,
        duration,
        onProgress: x => element.scrollTop = x
    })
    
}