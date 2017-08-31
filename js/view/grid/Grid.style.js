var j2c = require('mithril-j2c');
var breakpoints = require('../utils/breakpoints');
var metrics = require('../utils/metrics');
var range = require('lodash/range');
var merge = require('lodash/merge');
var round = require('lodash/round');

var COLUMNS = 12;
var col = x => ( 100 / COLUMNS ) * x + '%';
var baseline = ( x, breakpoint ) => x  * metrics.baseline( breakpoint ) + 'px';

var base = {
    '.row': {
        position: 'relative',
        width: '100%',
        // maxWidth: '1600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        '&:after': {
            content: "''",
            display: 'table',
            clear: 'both'
        }
    },
    '.column': {
        position: 'relative',
        float: 'left'
    }
}

var map = ( fn, from = 0, to = COLUMNS, step = 1 ) => {
    
    var css = {};
    
    breakpoints.forEach( breakpoint => {
        
        range( from, to + 1, step ).forEach( value => {
            
            css = merge( css, fn( breakpoint, value ) )
            
        });
        
    })
    
    return css;
    
}

var name = ( breakpoint, prefix, value ) => {
    value = typeof value === 'number' ? round( value, 5 ) : value;
    return ( breakpoint.name + '_' + prefix + '_' + value ).replace('.', '-');
}

var atom = ( prop, prefix, unit ) => ( breakpoint, value ) => {
    
    return {
        [ '.' + name( breakpoint, prefix, value ) ]: {
            [ breakpoint ]: {
                [ prop ]: unit( value, breakpoint )
            }
        }
    }
    
}

var gutters = ( breakpoint, value ) => {
    
    var pad = ( metrics.baseline( breakpoint ) / 2 ) * value + 'px';
    
    var padding = {
        [ breakpoint ]: {
            paddingLeft: pad,
            paddingRight: pad
        }
    }
    
    var classname = name( breakpoint, 'gutter', value );
    
    return {
        [ '.row.' + classname ]: padding,
        [ '.' + classname + ' > .column' ]: padding
    }
    
}

var flex = ( breakpoint, value ) => {
    
    var classname = name( breakpoint, 'flex', 'true' );
    
    return {
        [ '.row.' + classname ]: {
            maxWidth: 'none'
        },
    }
    
}

var css = j2c.attach(merge(
    base,
    map( atom( 'width', 'width', col ), 1 ),
    map( atom( 'margin-left', 'offset', col ) ),
    map( atom( 'margin-top', 'marginTop', baseline ), 0, 5, .5 ),
    map( atom( 'margin-bottom', 'marginBottom', baseline ), 0, 5, .25 ),
    //map( atom( 'left', 'push' ), -COLUMNS )//,
    map( gutters, 0, 2, .5 ),
    map( flex, 0, 0 )
))

var modifier = ( prefix, values = [] ) => {
    
    if ( !Array.isArray( values ) ) values = [ values ];
    
    return breakpoints.fill( values ).map( ( value, i ) => {
        return css[ name( breakpoints[ i ], prefix, value ) ]
    })
    
}

var element = base => modifiers => {
    
    var classes = [ base ];
    
    if ( modifiers === undefined ) return classes;
    
    for ( var prefix in modifiers ) {
        
        classes = classes.concat( modifier( prefix, modifiers[ prefix ] ) );
        
    }
    
    return classes.join(' ');
    
}

module.exports = {
    row: element( css.row ),
    column: element( css.column )
}