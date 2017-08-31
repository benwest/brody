var m = require('mithril');

var Static = require('../utils/Static');
var { Row, Column } = require('../grid/Grid');
var arrange = require('../grid/arrange');
var { textWidths } = require('../utils/metrics');
var { text } = require('../utils/typography');

module.exports = {
    
    oninit: ({ state, attrs: { content, width, position } }) => {
        
        state.columns = arrange( [ content ], textWidths[ width ], position );
        
    },
    
    view: ({
        state: { columns }
    }) => {
        
        var columns = columns.map( ([ widths, offsets, content ], i ) => {
            return (
                <Column key={ i } width={ widths } offset={ offsets } marginBottom={[ 4, 2 ]}>
                    <div class={ text }>{ m.trust( content ) }</div>
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