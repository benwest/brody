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
    
    onupdate: ({ state }) => {
        
        document.body.style.overflowY = state.menuOpen ? 'hidden' : 'scroll';
        
    },
    
    view: ({
        attrs: { menu },
        state,
        children,
    }) => {
        
        var toggleMenu = () => state.menuOpen = !state.menuOpen;
        
        var link = ({ dom }) => dom.addEventListener('click', e => {
            e.preventDefault();
            state.menuOpen = false;
            scrollTo( 0, 0 );
            m.route.set( dom.getAttribute('href') );
        })
        
        // var mainClasses = classnames({
        //     [ styles.main ]: true,
        //     [ styles.main_menuOpen ]: state.menuOpen
        // })
        
        return [
            j2c.view(),
            <div>
                { children }
            </div>,
            <Menu root={ menu } isOpen={ state.menuOpen } close={ toggleMenu } link={ link }/>,
            <MenuButton onclick={ toggleMenu } />
        ]
        
    }
    
}

