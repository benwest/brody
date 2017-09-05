var m = require('mithril');
var Page = require('./view/Page');
var api = require('./api');

var route = url => {
    
    var data = {};
    
    return {
        
        [ url ]: {
            
            onmatch: ( params, path ) => api( path ).then( r => {
                
                data.path = path;
                data.modules = r.modules;
                data.meta = r.meta;
                
            }),
            
            render: () => ( <Page {...data }/> )
            
        }
    }
    
}

module.exports = Object.assign(
    route('/'),
    route('/project/:slug')
)