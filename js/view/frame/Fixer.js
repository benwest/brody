var m = require('mithril');
var j2c = require('mithril-j2c');

var styles = j2c.attach({
    '.spacer': {
        position: 'relative',
        background: 'red',
        width: '100%'
    },
    '.container': {
        pointerEvents: 'none'
    }
})

module.exports = {
    
    oninit: ({ state }) => {
        
        state.top = 0;
        
    },
    
    onupdate: ({ state, dom, attrs }) => {
        
        state.top = 'top' in attrs ? attrs.top : dom.offsetTop;
        
    },
    
    view: ({
        attrs: { width, height, scrollHeight },
        state: { top },
        children
    }) => {
        
        var st = window.pageYOffset;
        
        var spacerStyle = {
            height: scrollHeight + height + 'px'
        };
        
        var containerStyle = {
            width: width + 'px',
            height: height + 'px'
        }
        
        if ( top > st ) {
            
            containerStyle.top = 0;
            containerStyle.position = 'absolute';
            
        } else if ( st > top + scrollHeight ) {
            
            containerStyle.top = scrollHeight + 'px'
            containerStyle.position = 'absolute';
            
        } else {
            
            containerStyle.top = 0;
            containerStyle.position = 'fixed';
            
        }
        
        return (
            <div class={ styles.spacer } style={ spacerStyle }>
                <div class={ styles.container } style={ containerStyle }>
                    { children }
                </div>
            </div>
        )
        
    }
    
}