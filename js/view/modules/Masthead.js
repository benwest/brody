var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');
var { baseline } = require('../utils/metrics');
var { responsive, mediaQueries } = require('../utils/breakpoints');
var lazyRect = require('../utils/lazyRect');
var visible = require('../utils/visible');
var Module = require('./Module');

var peep = responsive([ 4, 3 ]);

var getHeight = ( baseline, lines ) => ({
    height: `calc( 100vh - ${ baseline * lines }px )`
})

var styles = j2c.attach({

    '.masthead': {
        background: 'black',
        contain: 'strict',
        cursor: 'default',
        overflow: 'hidden',
        position: 'relative',
        '': mediaQueries( [ baseline, peep ], getHeight )
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
    
    view: ({ state: { visible }, attrs: { content } }) => {
        
        return <div class={ styles.masthead }>{ visible && content && <Module {...content }/> }</div>
        
    }

}