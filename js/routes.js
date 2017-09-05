var m = require('mithril');
var Page = require('./view/Page');
// var Layout = require('./view/Layout');
// var Modules = require('./view/modules/Modules');
// var api = require('./api');

module.exports = {
    
    '/': Page,
    
    '/project/:slug': Page
    
};