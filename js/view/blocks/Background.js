var m = require('mithril');
var j2c = require('mithril-j2c');
var { baseline } = require('../utils/metrics');
var { responsive, mediaQueries } = require('../utils/breakpoints');
var merge = require('lodash/merge');

var Video = require('./Video');
var { BackgroundImage } = require('./Image');

var margin = responsive([ 2 ]);

var styles = j2c.attach({
    '.background': merge(
        {
            width: '100%',
            position: 'relative',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden'
        },
        {
            '&:not(:first-child)': mediaQueries( [ baseline, margin ], ( b, m ) => ({ 'paddingTop': b * m + 'px' }) )
        }
    ),
    '.backgroundVideo': {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        height: '100%',
        pointerEvents: 'none'
    }
})

module.exports = {
    
    view: ({
        attrs: { color, file, fixed, showAll },
        children
    }) => {
        
        var style = {
            backgroundColor: color,
            minHeight: showAll ? '100vh' : 'auto'
        }
        
        var child;
        
        if ( !file ) {
            
            child = '';
            
        } else if ( file.type === 'video' ) {
            
            child = <Video file={ file } cover={ true }/>
            
        } else if ( file.type === 'image' ) {
            
            child = <BackgroundImage file={ file } fixed={ fixed }/>
            
        }
        
        return (
            <div class={ styles.background } style={ style }>
                { child }
                { children }
            </div>
        )
        
    }
    
}
