var m = require('mithril');

var literal = node => {
    
    if ( typeof node === 'string' ) return node;
    
    var [ tag, attrs, children ] = node;
    
    return m( tag, attrs, children.map( literal ) );
    
}

module.exports = literal;