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
        '-webkit-text-size-adjust': '100%',
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
    
    onupdate: ({ attrs: { meta }}) => {
        
        document.title = meta.title;
        
    }
    
}

var clientView = ({ attrs, state }) => {
    
    return [
        j2c.view(),
        attrs.modules && <Modules key={ attrs.path } modules={ attrs.modules } meta={ attrs.meta }/>,
        //!attrs.modules && <Preloader/>,
        attrs.meta && <Menu/>,
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