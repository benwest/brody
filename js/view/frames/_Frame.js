var m = require('mithril');
var j2c = require('mithril-j2c');

var Fixer = require('./Fixer');

var { map, layout, scroll, maxScroll } = require('./utils');

var styles = j2c.attach({
    '.frame': {
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden'
    }
})

var render = model => {
    
    var style = {
        width: model.width + 'px',
        height: model.height + 'px',
        transform: `translate( ${ model.x }px, ${ model.y - model.scrollTop }px)`
    }
    
    return (
        <div class={ styles.frame } style={ style }>
            { model.children ? model.children.map( render ) : '' }
            { model.content ? model.content : '' }
        </div>
    )
    
}

module.exports = {
    
    oninit: ({ state }) => {
        
        state.top = 0;
        
    },
    
    onupdate: ({ state, dom }) => {
        
        state.top = dom.offsetTop;
        
    },
    
    view: ({
        attrs: { structure },
        state: { top },
        dom
    }) => {
        
        var width = window.innerWidth;
        var height = window.innerHeight;
        var scrollTop = window.pageYOffset - top;
        
        var model = map( structure, item => ({
            title: item.title,
            content: item.content,
            margin: item.margin || [ 35, 35, 35, 35 ],
            scrollTop: 0,
            x: 0,
            y: 0,
            offset: 0,
            height: 0,
            width: 0
        }));
        
        model.width = width;
        model.height = height;
        
        layout( model );
        
        var scrollHeight = maxScroll( model );
        
        scroll( model, Math.min( Math.max( scrollTop, 0 ), scrollHeight ) );
        
        // console.log( window.pageYOffset - top )
        
        var style = {
            height: height + 'px'
        }
        
        return (
            <Fixer width={ width } height={ height } scrollHeight={ scrollHeight } top={ top }>
                { render( model ) }
            </Fixer>
        )
        
    }
    
}