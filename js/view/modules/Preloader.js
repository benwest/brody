var m = require('mithril');
var j2c = require('mithril-j2c');
var getColor = require('../frames/colors');
var { margin } = require('../utils/metrics');
var { mediaQueries } = require('../utils/breakpoints');
var range = require('lodash/range');

var styles = j2c.attach({
    '.layer': {
        position: 'absolute',
        transitionProperty: 'opacity',
        transitionDuration: '.25s',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        ' > .layer': mediaQueries( margin, ([ t, r, b, l ]) => ({
            top: t + 'px',
            left: l + 'px',
            bottom: b + 'px',
            right: r + 'px'
        })),
        '&.out, .out &': {
            opacity: 0
        }
    }
})

var div = ( children = '' ) => (<div class={ styles.layer }>{ children }</div>);

module.exports = {
    
    view: () => {
        
        return range( 10 ).reduce( prev => div( prev ), '' );
        
    }
    
}