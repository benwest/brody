var m = require('mithril');
var j2c = require('mithril-j2c');
var { baseline } = require('../utils/metrics');
var { responsive, mediaQueries } = require('../utils/breakpoints');

var peep = responsive([ 4, 3 ]);

var getHeight = ( baseline, lines ) => ({
    height: `calc( 100vh - ${ baseline * lines }px )`
})

var styles = j2c.attach({
    
    '.hero': Object.assign(
        {
            width: '100vw',
            background: 'black',
            //height: 'calc( 100vh - 105px )',
        },
        mediaQueries( [ baseline, peep ], getHeight )
    )
    
})

module.exports = {
    
    view: () => {
        
        return <div class={ styles.hero }/>
        
    }
    
}