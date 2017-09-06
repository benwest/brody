var { responsive, map } = require('./breakpoints');

var baseline = responsive([ 30, 30, 35, 35 ]);

var topMargin = x => [ x, 0, 0, 0 ];
var allMargins = x => [ x, x, x, x ];
var marginFn = responsive([ topMargin, allMargins ])

var margin = responsive( map( breakpoint => marginFn( breakpoint )( baseline( breakpoint ) ) ) );

var imageWidths = {
    small: [ 8, 6, 4 ],
    medium: [ 12, 8, 6 ],
    large: [ 12 ]
}

var textWidths = {
    full: [ 12 ],
    large: [ 12, 12, 12, 8 ],
    medium: [ 12, 10, 8, 6 ],
    small: [ 12, 8, 6, 4 ]
}

module.exports = { baseline, margin, textWidths, imageWidths };