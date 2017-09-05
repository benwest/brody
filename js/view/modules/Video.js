var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');
var lazyRect = require('../utils/lazyRect');
var visible = require('../utils/visible');
var redraw = require('../utils/redraw');

var styles = j2c.attach({
    '.container': {
        width: '100%',
        ' video': {
            '@keyframes fade-in': {
                ' from': { opacity: 0 },
                ' to': { opacity: 1 }
            },
            animation: 'fade-in 1s',
            width: '100%'
        },
        '&.cover': {
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            ' video': {
                width: 'auto',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '100%',
                minHeight: '100%',
            }
        }
    }
})

module.exports = {
    
    visible: false,
    
    oncreate: ({ state, dom }) => {
        
        state.rect = lazyRect.subscribe( dom );
        
    },
    
    onupdate: ({ state, dom }) => {
        
        state.visible = visible( lazyRect.get( state.rect ) );
        
    },
    
    onbeforeremove: ({ state: { rect } }) => {
        
        lazyRect.unsubscribe( rect );
        
    },
    
    view: ({ attrs: { file, fit }, state: { visible } }) => {
        
        var classname = classnames({
            [ styles.container ]: true,
            [ styles.cover ]: fit === 'cover'
        })
        
        var style = {};
        
        if ( !visible && fit !== 'cover' ) {
            
            style.paddingBottom = ( 9 / 16 ) * 100 + '%'
            
        }
        
        return (
            <div class={ classname } style={ style }>
                { visible && <video src={ file.url } autoplay loop muted playsinline/> }
            </div>
        )
        
    }
    
}