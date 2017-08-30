var m = require('mithril');

var { Row, Column } = require('../grid/Grid');
var arrange = require('../grid/arrange');
var Visual = require('./Visual');

var widths = {
    small: [ 8, 6, 4 ],
    medium: [ 12, 8, 6 ],
    large: [ 12 ]
}

module.exports = {
    
    oninit: ({
        attrs: { files, width, position, gutter },
        state
    }) => {
        
        state.columns = arrange( files, widths[ width ], position );
        
    },
    
    view: ({
        attrs: { gutter },
        state: { columns }
    }) => {
        
        var columns = columns.map(( [ widths, offsets, file ], i ) => {
            
            return (
                <Column key={ i } width={ widths } offset={ offsets } marginBottom={ gutter ? [ 2, 2, 2, 2 ] : undefined }>
                    <Visual file={ file }/>
                </Column>
            )
            
        });
        
        return (
            <Row gutter={ gutter ? [ 1, 1, 2 ] : undefined } margin={ gutter ? [ 2 ] : undefined } flex={ true }>
                { columns }
            </Row>
        )
        
    }
    
}