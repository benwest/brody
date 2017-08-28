var m = require('mithril');
var Page = require('./view/Page');
var Layout = require('./view/Layout');
var Blocks = require('./view/blocks/Blocks')
var api = require('./api');

var resolver = {
        
    onmatch: ( params, path ) => {
        
        return api( path )
            .then( data => {
                
                return { meta: data.meta, view: () => ( <Blocks { ...data }/> ) }
                
            });
        
    },
    
    render: content => {
        
        return (
            <Page meta={ content.tag.meta }>
                <Layout>
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