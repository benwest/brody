var m = require('mithril');

var routes = require('./routes');

m.route.prefix('');

m.route( document.body, '/', routes );

// require('./view/hero/rects/test');