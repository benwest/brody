var m = require('mithril');

var RichText = require("./RichText");
var Static = require('../utils/Static');
var { Row, Column } = require('../grid/Grid');
var arrange = require('../grid/arrange');

var widths = {
    large: [ 12, 12, 12, 8 ],
    medium: [ 12, 10, 8, 6 ],
    small: [ 12, 8, 6, 4 ]
}

module.exports = {
    
    oninit: ({ state, attrs: { content, width, position } }) => {
        
        state.columns = arrange( [ content ], widths[ width ], position );
        
    },
    
    view: ({
        state: { columns }
    }) => {
        
        var columns = columns.map( ([ widths, offsets, content ], i ) => {
            return (
                <Column key={ i } width={ widths } offset={ offsets } marginBottom={[ 4, 2 ]}>
                    <RichText content={ content }/>
                </Column>
            )
        })
        
        return (
            <Static>
                <Row gutter={ [ 1, 1, 2 ] }>
                    { columns }
                </Row>
            </Static>
        )
        
    }
    
}