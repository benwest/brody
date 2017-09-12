var m = require('mithril');
var j2c = require('mithril-j2c');
var metrics = require('./utils/metrics');
var api = require('../api');
var redraw = require('./utils/redraw');

var Modules = require('./modules/Modules');
var Menu = require('./menu/Menu');
var MenuButton = require('./menu/MenuButton');
var Preloader = require('./modules/Preloader');

j2c.attach('@global', {
    
    '@font-face': {
        src: 'url(/assets/fonts/BentonSans-Book.otf)',
        fontFamily: 'Benton Sans'
    },
    
    ' body': {
        margin: 0,
        background: 'black',
        fontFamily: 'Benton Sans, sans-serif',
        color: 'white',
        '-webkit-font-smoothing': 'antialiased',
        overflowX: 'hidden'
    },
    
    ' a': {
        textDecoration: 'none',
        color: 'inherit'
    },
    
    ' *': {
        boxSizing: 'border-box'
    }
    
})

var Page = {
    
    menuOpen: false,
    
    meta: null,
    
    modules: null,
    
    route: null,
    
    oninit: vnode => {
        
        vnode.state.link = vnode.state.link( vnode );
        vnode.state.getData = vnode.state.getData( vnode );
        
        // return vnode.state.getData( vnode.attrs.route );
        
    },
    
    onupdate: vnode => {
        
        // vnode.state.getData( vnode.attrs.route );
        
    },
    
    getData: vnode => url => {
        
        if ( url === vnode.state.route ) return;
        
        vnode.state.route = url;
        vnode.state.modules = null;
        redraw( 'route start' )
        
        return api( url )
            .then( r => {
                
                vnode.state.meta = r.meta;
                // vnode.state.modules = r.modules;
                redraw( 'route end' );
                
            });
        
    },
    
    link: vnode => ({ dom }) => dom.addEventListener( 'click', e => {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return;
        e.redraw = false;
        e.preventDefault();
        vnode.state.menuOpen = false;
        scrollTo( 0, 0 );
        m.route.set( dom.getAttribute('href') );
    }),
    
}

var clientView = ({ attrs, state }) => {
    
    var toggleMenu = () => state.menuOpen = !state.menuOpen;
    
    return [
        j2c.view(),
        attrs.modules && <Modules key={ attrs.path } modules={ attrs.modules } meta={ attrs.meta }/>,
        //!attrs.modules && <Preloader/>,
        attrs.meta && <Menu isOpen={ state.menuOpen } link={ state.link }/>,
        attrs.meta && <MenuButton onclick={ toggleMenu } />
    ]
    
};

var serverView = ({ attrs, state }) => {
    
    return (
        
        <html lang="en">
            <head>
                <title>{ attrs.meta && attrs.meta.title }</title>
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1" />
                <meta name="description" content={ attrs.meta && attrs.meta.description } />
            </head>
            <body>
                { clientView({ attrs, state }) }
                { false && <script>{ m.trust( `window.__apiCache = ${ JSON.stringify({ [ attrs.path ]: { meta: attrs.meta, modules: attrs.modules } }) }` ) }</script> }
                <script src="/assets/bundle.js"/>
            </body>
        </html>
        
    )
    
}

Page.view = process.browser ? clientView : serverView;

module.exports = Page;