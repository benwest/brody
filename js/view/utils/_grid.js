var j2c = require('mithril-j2c');
var breakpoints = require('./breakpoints');
var atoms = require('./atoms')
var metrics = require('./metrics');

var base = j2c.attach({
    '.row': {
        position: 'relative',
        width: '100%',
        '&:after': {
            content: "''",
            display: 'table',
            clear: 'both'
        },
        '&.gutter': {
            paddingLeft: metrics.baseline / 2 + 'px',
            paddingRight: metrics.baseline / 2 + 'px',
            [ breakpoints.tablet ]: {
                paddingLeft: metrics.baseline + 'px',
                paddingRight: metrics.baseline + 'px',
            }
        }
    },
    '.column': {
        float: 'left',
        position: 'relative',
        '.gutter &': {
            paddingLeft: metrics.baseline / 2 + 'px',
            paddingRight: metrics.baseline / 2 + 'px',
        }
    }
})

var COLUMNS = 12;
var unit = x => ( 100 / COLUMNS ) * x + '%';

var getter = prop => value => atoms( { [ prop ]: value }, unit );

module.exports = {
    row: base.row,
    gutter: base.gutter,
    column: base.column,
    width: getter('width'),
    offset: getter('margin-left'),
    push: getter('left')
};