var m = require('mithril');
var j2c = require('mithril-j2c');
var breakpoints = require('./breakpoints');

var classnames = {};

var getName = ( breakpoint, prop, value ) => {
    
    return [ breakpoint, prop, value ]
        .join('-')
        .replace('.', '-')
        .replace('%', 'pct');
    
}

var get = ( breakpoint, prop, value ) => {
    
    var bp = breakpoints[ breakpoint ];
    
    var name = getName( bp.name, prop, value );
    
    if ( !( name in classnames ) ) {
        
        var sheet = j2c.attach({
            
            [ bp ]: {
                
                [ '.' + name ]: {
                    
                    [ prop ]: value
                    
                }
                
            }
            
        });
        
        classnames[ name ] = sheet[ name ];
        
        //m.redraw();
        
    }
    
    return classnames[ name ];
    
}

module.exports = ( props, unit = x => x ) => Object.keys( props ).reduce( ( str, key ) => {
    
    var values = props[ key ];
    
    if ( !Array.isArray( values ) ) values = [ values ];
    
    values.forEach( ( value, i ) => {
        
        if ( value === null ) return;
        
        str += get( i, key, unit( value ) ) + ' '
        
    });
    
    return str;
    
}, '' );