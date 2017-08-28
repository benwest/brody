var home = require('./mock/home');
var menu = require('./mock/menu');
var project = require('./mock/project');

module.exports = url => new Promise( resolve => {
    
    if ( url.indexOf('project') > -1 ) return resolve( project );
    
    switch ( url ) {
        
        case '/': return resolve( home );
        
        case 'menu': return resolve( menu );
        
    }
    
});