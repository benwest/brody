var m = require('mithril');
var styles = require('mithril-j2c');
var metrics = require('./utils/metrics');

styles.attach('@global', {
    
    '@font-face': {
        src: 'url(/assets/fonts/BentonSans-Book.otf)',
        fontFamily: 'Benton Sans'
    },
    
    ' body': {
        margin: 0,
        background: 'black',
        fontFamily: 'Benton Sans, sans-serif',
        color: 'white',
        '-webkit-font-smoothing': 'antialiased'
    },
    
    ' a': {
        textDecoration: 'none',
        color: 'inherit'
    },
    
    ' *': {
        boxSizing: 'border-box'
    }
    
})

var ClientPage = {
    
    onupdate: ( { attrs: { meta } } ) => {
        
        document.title = meta.title;
        
    },
    
    view: ( { children } ) => children
    
}

var ServerPage = {
    
    view: ( { attrs: { meta }, children } ) => {
        
        return (
            
            <html lang="en">
            
                <head>
                    
                    <title>{ meta.title }</title>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1" />
                    <meta name="description" content={ meta.description } />
                    
                </head>
                
                <body>
                    { children }
                    <script>{ m.trust( `window.__apiPreload = ${ JSON.stringify( global.window.__apiPreload ) }` ) }</script>
                    <script src="/assets/bundle.js"/>
                </body>
                
            </html>
            
        )
        
    }
    
}

module.exports = process.browser ? ClientPage : ServerPage;