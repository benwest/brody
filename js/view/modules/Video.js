var m = require('mithril');
var j2c = require('mithril-j2c');
var lazyRect = require('../utils/lazyRect');
var visible = require('../utils/visible');
var redraw = require('../utils/redraw');

var styles = j2c.attach({
    '.video': {
        width: '100%',
        '&.cover': {
            width: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            pointerEvents: 'none'
        }
    }
})

module.exports = {
    
    oninit: ({ state, attrs: { file } }) => {
        
        state.seen = false;
        
    },
    
    oncreate: ({ state, dom }) => {
        
        state.rect = lazyRect.subscribe( dom );
        
    },
    
    onupdate: ({ state, dom }) => {
        
        state.seen = state.seen || visible( lazyRect.get( state.rect ) );
        
    },
    
    onbeforeremove: ({ state: { rect } }) => {
        
        lazyRect.unsubscribe( rect );
        
    },
    
    view: ({ attrs: { file, fit }, state: { seen } }) => {
        
        if ( !seen ) {
            
            var style = {
                paddingBottom: ( file.h / file.w ) * 100 + '%'
            }
            
            return <div class={ styles.video } style={ style }/>
            
        }
        
        var classname = styles.video + ' ' + ( fit === 'cover' ? styles.cover : '' );
        
        return <video class={ classname } src={ file.url } autoplay loop muted playsinline/>
        
    }
    
}