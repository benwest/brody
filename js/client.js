var m = require('mithril');
var redraw = require('./view/utils/redraw');

var routes = require('./routes');

m.route.prefix('');

m.route( document.body, '/', routes );