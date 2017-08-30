var zip = require('lodash/zip');

var sum = a => a.reduce( ( a, b ) => a + b, 0 );
var flatten = a => a.reduce( ( a, b ) => a.concat( b ), [] );
var fill = ( n, x ) => Array( n ).fill( x );

var distribute = widths => {
    var x = 0;
    var rows = [];
    var row = [];
    widths.forEach( width => {
        if ( x + width > 12 ) {
            rows.push( row );
            row = [];
            x = 0;
        }
        row.push( width );
        x += width;
    })
    if ( row.length ) rows.push( row );
    return rows;
}

var offsetRows = ( rows, fn ) => rows.map( row => {
    var w = sum( row );
    var ret = row.map( w => 0 );
    ret[ 0 ] = fn( w );
    return ret;
})

var positions = {
    left: w => 0,
    center: w => ( 12 - w ) / 2,
    right: w => 12 - w
}

var offsets = ( n, width, position ) => {
    var widths = fill( n, width );
    var rows = distribute( widths );
    var offsets = offsetRows( rows, positions[ position ] );
    return flatten( offsets );
}

var arrange = ( n, breakpoints, position ) => {
    return zip(...breakpoints.map( width => {
        return offsets( n, width, position );
    }))
}

module.exports = ( contents, breakpoints, position ) => zip(
    fill( contents.length, breakpoints ),
    arrange( contents.length, breakpoints, position ),
    contents
);