var m = require('mithril');

var RichText = require("./RichText");
var Static = require('../utils/Static');
var { Row, Column } = require('../grid/Grid');

module.exports = {
    
    view: ({
        attrs: { content, size, position, alignment }
    }) => {
        
        return (
            //<Static>
                <Row gutter={ [ 1, 1, 2 ] }>
                    <Column size={ size } position={ position } marginBottom={[4, 2 ]}>
                        <RichText content={ content }/>
                    </Column>
                </Row>
            //</Static>
        )
        
    }
    
}