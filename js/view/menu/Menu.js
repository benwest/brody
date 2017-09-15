var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');
var breakpoints = require('../utils/breakpoints');
var { baseline } = require('../utils/metrics');
// var scrollTo = require('./scrollTo');
var api = require('../../api');

var MenuButton = require('./MenuButton');
var TextMenu = require('./TextMenu');
var ImageMenu = require('./ImageMenu');
var Search = require('./Search');

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
        contain: 'strict',
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
    },
    
    '.searchButton': {
        position: 'absolute',
        top: 0,
        backgroundImage: 'url(/assets/img/search.svg)',
        backgroundSize: '100% 100%',
        cursor: 'pointer',
        opacity: .5,
        transition: 'opacity .25s',
        right: 0,
        [ breakpoints.tablet ]: {
            right: 0
        },
        '&:hover': {
            opacity: 1
        },
        '': breakpoints.mediaQueries( baseline, x => ({
            width: x + 'px',
            height: x + 'px'
        }))
    }
    
})

module.exports = {
    
    root: null,
    
    selected: -1,
    
    open: false,
    
    searchOpen: false,
    
    oninit: vnode => {
        
        return api('/menu')
            .then( menu => vnode.state.root = menu )
        
    },

    view: ({
        state
    }) => {
        
        var menuClasses = classnames({
            [ styles.menu ]: true,
            [ styles.open ]: state.open
        })
        
        var select = id => state.selected = id;
        
        var openSearch = () => state.searchOpen = true;
        var closeSearch = () => state.searchOpen = false;
        var open = () => state.open = true;
        var close = () => {
            closeSearch();
            state.open = false;
        }
        var toggle = () => state.open ? close() : open();
        
        var go = url => {
            close();
            scrollTo( 0, 0 );
            m.route.set( url );
        }
        
        var onclick = url => e => {
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return;
            e.redraw = false;
            e.preventDefault();
            go( url );
        }
        
        var menuAttrs = {
            root: state.root,
            selected: state.selected,
            select,
            onclick
        };
        
        return [
            <div class={ menuClasses }>
                <div class={ styles.left }>
                    <TextMenu { ...menuAttrs }/>
                    <div class={ styles.searchButton } onclick={ openSearch }/>
                </div>
                <div class={ styles.right }>
                    <ImageMenu { ...menuAttrs }/>
                </div>
                { state.searchOpen && <Search root={ state.root } close={ closeSearch } go={ go }/> }
            </div>,
            <MenuButton onclick={ toggle }/>
        ];
        
    }
    
}