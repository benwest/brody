var m = require('mithril');
var j2c = require('mithril-j2c');
var { Row, Column } = require('../grid/Grid');
var typography = require('../utils/typography');
var Static = require('../utils/Static');
var typography = require('../utils/typography');
var { baseline } = require('../utils/metrics');
var breakpoints = require('../utils/breakpoints');

var styles = j2c.attach({
    '.intro': {
        [ breakpoints.tabletLandscape ]: {
            'column-count': 2,
            'column-gap': baseline( breakpoints.tabletLandscape )
        },
        [ breakpoints.desktop ]: {
            'column-gap': baseline( breakpoints.desktop )
        },
        [ breakpoints.desktopLarge ]: {
            'column-gap': baseline( breakpoints.desktopLarge )
        }
    }
})

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
                        <div class={ styles.intro + ' ' + typography.text }>
                            { m.trust( text ) }
                        </div> 
                    </Column>
                </Row>
            </Static>
        )
        
    }
    
}