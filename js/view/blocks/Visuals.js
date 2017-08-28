var m = require('mithril');
var zip = require('lodash/zip');
var { Row, Column } = require('../grid/Grid');
var Visual = require('./Visual');

var sum = a => a.reduce( ( a, b ) => a + b, 0 );
var flatten = a => a.reduce( ( a, b ) => a.concat( b ), [] );
var fill = ( n, x ) => Array( n ).fill( x );

var sizes = {
    small: [ 8, 6, 4 ],
    medium: [ 12, 8, 6 ],
    large: [ 12 ]
}

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

var arrangeColumns = ( n, size, position ) => {
    var breakpoints = sizes[ size ];
    return zip(...breakpoints.map( width => {
        return offsets( n, width, position );
    }))
}


module.exports = {
    
    oninit: ({
        attrs: { files, size, position, gutter },
        state
    }) => {
        
        state.columns = zip(
            fill( files.length, sizes[ size ] ),
            arrangeColumns( files.length, size, position ),
            files
        );
        
    },
    
    view: ({
        attrs: { gutter },
        state: { columns }
    }) => {
        
        var columns = columns.map(( [ widths, offsets, file ], i ) => {
            
            return (
                <Column width={ widths } offset={ offsets } marginBottom={ gutter ? [ 2, 2, 2, 2 ] : undefined }>
                    <Visual file={ file }/>
                </Column>
            )
            
        });
        
        return (
            <Row gutter={ gutter ? [ 1, 1, 2 ] : undefined } flex={ true }>
                { columns }
            </Row>
        )
        
    }
    
}