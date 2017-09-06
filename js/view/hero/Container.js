var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');
var { baseline } = require('../utils/metrics');
var { responsive, mediaQueries } = require('../utils/breakpoints');
var lazyRect = require('../utils/lazyRect');
var visible = require('../utils/visible');

var peep = responsive([ 4, 3 ]);

var getHeight = ( baseline, lines ) => ({
    height: `calc( 100vh - ${ baseline * lines }px )`
})

var styles = j2c.attach({
    
    '.hero': {
        width: '100%',
        height: '100%',
        background: 'black',
        contain: 'strict',
        '&.masthead': mediaQueries( [ baseline, peep ], getHeight )
    }
    
})

module.exports = {
    
    oncreate: ({ state, dom }) => {
        
        state.rect = lazyRect.subscribe( dom );
        
        state.check( state );
        
    },
    
    onupdate: ({ state }) => {
        
        state.check( state );
        
    },
    
    check: state => {
        
        state.visible = visible( lazyRect.get( state.rect ) );

    },
    
    view: ({ state: { visible }, attrs: { masthead }, children }) => {
        
        var classes = classnames({
            [ styles.hero ]: true,
            [ styles.masthead ]: masthead
        });
        
        return <div class={ classes }>{ visible && children }</div>
        
    }

}