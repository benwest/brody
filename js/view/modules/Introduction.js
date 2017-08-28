var m = require('mithril');

var { Row, Column } = require('../grid/Grid');
var typography = require('../utils/typography');
var RichText = require('./RichText');
var Static = require('../utils/Static');

module.exports = {
    
    view: ({
        attrs: { text, client, discipline, year }
    }) => {
        
        return (
            <Static>
                <Row gutter={ [ 1, 1, 2 ] } marginTop={ [ 4, 3, 2 ] }>
                    <Column width={[ 12, 12, 4 ]} marginBottom={[ 4, 2 ]}>
                        <div class={ typography.text }>
                            <h2>
                                <strong>{ client }</strong><br/>
                                { discipline }<br/>
                                { year }<br/>
                            </h2>
                        </div>
                    </Column>
                    <Column width={[ 12, 8 ]} marginBottom={ [ 4, 2 ] }>
                        <RichText content={ text }/>
                    </Column>
                </Row>
            </Static>
        )
        
    }
    
}