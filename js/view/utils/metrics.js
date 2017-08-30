var { responsive, map } = require('./breakpoints');

var baseline = responsive([ 20, 25, 35, 35 ]);

var topMargin = x => [ x, 0, 0, 0 ];
var allMargins = x => [ x, x, x, x ];
var marginFn = responsive([ topMargin, allMargins ])

var margin = responsive( map( breakpoint => marginFn( breakpoint )( baseline( breakpoint ) ) ) );

module.exports = { baseline, margin };