var m = require('mithril');
var j2c = require('mithril-j2c');

var { text } = require('../utils/typography');

module.exports = {
    
    view: ({ attrs: { content } }) => {
        
        return <div class={ text }>{ m.trust( content ) }</div>
        
    }
    
}