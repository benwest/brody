require('babel-register')({
    plugins: [ [ 'transform-react-jsx', { pragma: 'm' } ] ]
});

require('mithril/test-utils/browserMock')( global );
global.window.innerWidth = 1;
global.window.innerHeight = 1;
global.window.pageYOffset = 0;
global.window.addEventListener = () => {};
global.window.XMLHttpRequest = require('w3c-xmlhttprequest').XMLHttpRequest;

var m = require('mithril');

var express = require('express');
var toHTML = require('mithril-node-render');

var routes = require('./routes');
var Page = require('./view/Page');

var server = express();

Object.keys( routes ).forEach( url => {
    
    var { onmatch, render } = routes[ url ];
    
    server.get( url, ( req, res, next ) => {
        
        global.window.__apiPreload = {};
        
        if ( true /* skip rendering */ ) {
            
            toHTML( m( Page, { meta: {} } ) ).then( html => res.send( html ) );
            
        } else {
            
            onmatch( req.params, req.url )
                .then( m )
                .then( render )
                .then( toHTML )
                .then( html => {
                    
                    res
                        .type('html')
                        .send( '<!DOCTYPE html>' + html )
                    
                })
            
        }
        
    })
    
});

server.use( '/assets', express.static( 'assets' ) );

server.listen( process.env.PORT, process.env.IP, () => console.log('👍🏻') );