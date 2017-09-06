var m = require('mithril');
var j2c = require('mithril-j2c');
var viewport = require('../utils/viewport');
var lazyRect = require('../utils/lazyRect');
var visible = require('../utils/visible');

var styles = j2c.attach({
    '.spacer': {
        position: 'relative',
        //background: 'red',
        width: '100%'
    },
    '.container': {
        // pointerEvents: 'none',
        overflowY: 'hidden'
    }
})

module.exports = {
    
    top: 0,
    
    oncreate: ({ state, dom }) => {
        
        state.rect = lazyRect.subscribe( dom );
        
        state.check({ state, dom });
        
    },
    
    onupdate: ({ state, dom }) => {
        
        state.check({ state, dom });
        
    },
    
    check: ({ state, dom }) => {
        
        var rect = lazyRect.get( state.rect );
        
        state.visible = visible( rect );
        state.top = state.visible ? dom.getBoundingClientRect().top : rect.top;
        
    },
    
    onbeforeremove: ({ state: { rect } }) => {
        
        lazyRect.unsubscribe( rect );
        
    },
    
    view: ({
        attrs: { width, height, scrollHeight, getContent },
        state: { top, visible },
        children
    }) => {
        
        var bottom = top + scrollHeight + height;
        var fixed = top < 0 && bottom > viewport.h;
        
        var spacerStyle = {
            height: scrollHeight + height + 'px'
        };
        
        var containerStyle = {
            width: width + 'px',
            height: height + 'px',
            position: fixed ? 'fixed' : 'absolute',
            top: bottom <= viewport.h ? scrollHeight + 'px' : 0
        }
            
        var progress = Math.max( Math.min( -top, scrollHeight ), 0 );
        
        return (
            <div class={ styles.spacer } style={ spacerStyle }>
                { visible && <div class={ styles.container } style={ containerStyle }>
                    { getContent ? getContent( progress, fixed ) : children }
                </div> }
            </div>
        )
        
    }
    
}