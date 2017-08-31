var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');
var breakpoints = require('../utils/breakpoints');
var scrollTo = require('./scrollTo');

var TextMenu = require('./TextMenu');
var ImageMenu = require('./ImageMenu');

var styles = j2c.attach({
    
    '.menu': {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 500
    },
    
    '.open': {
        pointerEvents: 'visible'
    },
    
    '.left, .right': {
        position: 'absolute',
        top: 0,
        height: '100%',
        background: 'black',
        overflowX: 'hidden',
        overflowY: 'scroll',
        transition: 'transform .5s',
        '-webkit-overflow-scrolling': 'touch',
        '.open &': {
            transform: 'none'
        }
    },
    
    '.left': {
        left: 0,
        width: '100%',
        [ breakpoints.tablet ]: {
            width: '50%'
        },
        [ breakpoints.tabletLandscape ]: {
            width: '33.333%'
        },
        [ breakpoints.desktopLarge ]: {
            width: '25%'
        },
        transform: 'translateX(-100%)'
    },
    
    '.right': {
        display: 'none',
        [ breakpoints.tablet ]: {
            display: 'block',
            width: '50%',
            left: '50%'
        },
        [ breakpoints.tabletLandscape ]: {
            width: '66.666%',
            left: '33.333%'
        },
        [ breakpoints.desktopLarge ]: {
            width: '75%',
            left: '25%'
        },
        transform: 'translateX(100%)'
    }
    
})

module.exports = {
    
    side: -1,
    
    selected: -1,
    
    oninit: vnode => {
        
        vnode.state.select = vnode.state.select( vnode );
        
    },
    
    select: vnode => side => id => e => {
        
        vnode.state.selected = id;
        
        var otherSide = side === 0 ? 1 : 0;
        
        // scrollTo( vnode.dom.childNodes[ otherSide ], id );
        
    },
    
    view: ({
        state,
        attrs: { root, isOpen, link }
    }) => {
        
        var setSide = side => e => state.side = side;
        
        var menuClasses = classnames({
            [ styles.menu ]: true,
            [ styles.open ]: isOpen
        })
        
        var attrs = {
            root,
            selected: state.selected,
            link
        };
        
        return (
            <div class={ menuClasses }>
                <div class={ styles.left } onmouseenter={ setSide( 0 ) }>
                    <TextMenu select={ state.select( 0 ) } { ...attrs }/>
                </div>
                <div class={ styles.right } onmouseenter={ setSide( 1 ) }>
                    <ImageMenu select={ state.select( 1 ) } { ...attrs }/>
                </div>
            </div>
        );
        
    }
    
}