var m = require('mithril');
var j2c = require('mithril-j2c');
var rect = require('../hero/rects');

var styles = j2c.attach({
    '.canvas': {
        width: '100%',
        height: '100%',
        background: 'black'
    }
})

var options = {
    attributes: {
        alpha: false,
        depth: false,
        antialias: false
    }
}

module.exports = {
    
    oncreate: ({ dom, attrs: { root } }) => {
        
        rect.render( dom, root, options );
        
    },
    
    onupdate: ({ dom, attrs: { root } }) => {
        
        rect.render( dom, root );
        
    },
    
    onremove: ({ dom }) => {
        
        rect.destroy( dom );
        
    },
    
    view: () => {
        
        return <canvas class={ styles.canvas }/>
        
    }
    
}