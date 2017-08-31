var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');

var Menu = require('./menu/Menu');
var MenuButton = require('./menu/MenuButton');

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
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return;
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

