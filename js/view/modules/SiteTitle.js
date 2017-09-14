var m = require('mithril');
var j2c = require('mithril-j2c');
var { baseline, margin } = require('../utils/metrics');
var { mediaQueries } = require('../utils/breakpoints');

var grey = '#9C9B9B';

var styles = j2c.attach({
    '.title': mediaQueries( [ baseline, margin ], ( baseline, margin ) => ({
        position: 'fixed',
        lineHeight: baseline + 'px',
        height: baseline + 'px',
        paddingLeft: Math.max( margin[ 3 ], 10 ) + 'px'
    }))
})

module.exports = {
    
    view: () => {
        
        return (
            <div class={ styles.title }>
                Brody <span style={ { color: grey } }>Associates</span>
            </div>
        )
        
    }
}