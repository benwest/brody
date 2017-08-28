var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');

var Menu = require('./menu/Menu');
var MenuButton = require('./menu/MenuButton');

// var styles = j2c.attach({
    
//     '.main': {
        
//         // position: 'fixed',
//         // top: 0,
//         // left: 0,
//         // width: '100%',
//         // height: '100%',
//         // transition: 'transform .5s, opacity .5s',
//         // background: 'black',
//         // overflowX: 'hidden',
//         // overflowY: 'scroll',
        
//         // '&_menuOpen': {
//         //     transform: 'scale(1.1, 1.1)',
//         //     opacity: 0
//         // }
        
//     }
    
// })

module.exports = {
    
    oninit: ({ state }) => {
        
        state.menuOpen = false;
        
    },
    
    view: ({
        state,
        children,
    }) => {
        
        var toggleMenu = () => state.menuOpen = !state.menuOpen;
        
        // var mainClasses = classnames({
        //     [ styles.main ]: true,
        //     [ styles.main_menuOpen ]: state.menuOpen
        // })
        
        return [
            j2c.view(),
            <div>
                { children }
            </div>,
            //<Menu open={ state.menuOpen } />,
            <MenuButton onclick={ toggleMenu } />
        ]
        
    }
    
}

