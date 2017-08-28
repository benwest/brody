var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');
var breakpoints = require('../utils/breakpoints');

var TextMenu = require('./TextMenu');
var ImageMenu = require('./ImageMenu');

var styles = j2c.attach({
    
    '.menu': {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        transition: 'transform .5s ease-out, opacity .5s ease-in',
        // transform: 'scale( .8, .8 )',
        // opacity: 1,
        pointerEvents: 'none'
    },
    
    '.open': {
        // transform: 'none',
    //     opacity: 1,
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
    
    oninit: ({ state }) => {
        
        state.root = require('../../mock/menu.json');
        
        state.selected = -1;
        // state.lastHovered = -1;
        
        state.select = state.select( state );
        
    },
    
    select: state => id => e => {
        
        state.selected = id;
        
    },
    
    view: ({
        state: { root, selected, select },
        attrs: { open }
    }) => {
        
        var menuClasses = classnames({
            [ styles.menu ]: true,
            [ styles.open ]: open
        })
        
        var attrs = { root, selected, select };
        
        return (
            <div class={ menuClasses }>
                <div class={ styles.left }>
                    <TextMenu { ...attrs }/>
                </div>
                <div class={ styles.right }>
                    <ImageMenu { ...attrs }/>
                </div>
            </div>
        );
        
    }
    
}