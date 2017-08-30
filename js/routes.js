var m = require('mithril');
var Page = require('./view/Page');
var Layout = require('./view/Layout');
var Modules = require('./view/modules/Modules');
var api = require('./api');

var resolver = {
        
    onmatch: ( params, path ) => {
        
        return Promise.all([
            api( '/menu' ),
            api( path ),
        ]).then( ([ menu, data ]) => {
                
                return { meta: data.meta, menu, view: () => ( <Modules { ...data }/> ) }
                
            })
            .catch(() => {
                
                
                
            });
        
    },
    
    render: content => {
        
        return (
            <Page meta={ content.tag.meta }>
                <Layout menu={ content.tag.menu }>
                    { content }
                </Layout>
            </Page>
        );
        
    }
        
}

module.exports = {
    
    '/': resolver,
    
    '/project/:slug': resolver
    
};