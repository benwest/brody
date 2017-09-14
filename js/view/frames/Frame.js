var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');
var Module = require('../modules/Module');
var { margin } = require('../utils/metrics');
var { mediaQueries } = require('../utils/breakpoints');

var styles = j2c.attach({
    '.item': {
        position: 'absolute',
        overflow: 'hidden',
        contain: 'strict'
    },
    '.listItem': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        contain: 'strict'
    },
    '.title': {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 10,
        contain: 'strict',
        '': mediaQueries( margin, ([ t, r, l, b ]) => ({
            paddingLeft: Math.max( l, 10 ) + 'px',
            height: t + 'px',
            lineHeight: t + 'px'
        })),
    }
})

var Item = {
    
    view: ( { attrs: { x, y, w, h }, children } ) => {
        
        var style = {
            width: w + 'px',
            height: h + 'px',
            top: y + 'px',
            left: x + 'px'
        };
        
        return (
            <div class={ styles.item } style={ style }>
                { children }
            </div>
        )
        
    }
    
}

var List = {
    
    view: ({
        attrs: { x, y, w, h, scrollTop, children },
    }) => {
        
        var children = children.map( ( child, i ) => {
            
            var y = i * h - scrollTop;
            
            if ( y >= h || y + h < 0 ) return;
            
            var style = {
                transform: `translateY( ${ Math.floor( y ) }px )`,
                backgroundColor: child.attrs.color
            }
            
            // var titleClasses = classnames({
            //     [ styles.title ]: true,
            //     [ styles.off ]: child.attrs.title.y < 0
            // })
            
            var titleStyle = {
                // paddingLeft: child.attrs.x + 'px',
                // lineHeight: child.attrs.y + 'px',
                // height: child.attrs.y + 'px',
                backgroundColor: child.attrs.color,
                transform: `translateY( ${ Math.floor( child.attrs.title.y ) }px )`
            }
            
            return [
                <div class={ styles.title } style={ titleStyle } key={ 't' + i }>
                    { child.attrs.title.text }
                </div>,
                <div class={ styles.listItem } style={ style } key={ i }>
                    {
                        child.type === 'list' ?
                            <List { ...child.attrs }/>
                        :
                            <Item { ...child.attrs }>
                                <Module { ...child.attrs.content }/>
                            </Item>
                    }
                </div>
            ];
            
        });
        
        return (
            <Item { ...{ x, y, w, h } }>
                { children }
            </Item>
        )
        
    }
    
}

module.exports = List;