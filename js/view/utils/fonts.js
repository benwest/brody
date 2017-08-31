var j2c = require('mithril-j2c');

var count = 0;
var cache = {};

module.exports = url => {
    
    if ( !( url in cache ) ) {
    
        var name = 'f' + count++;
        
        var styles = j2c.attach({
            '@font-face': {
                fontFamily: name,
                src: `url(${url})`
            },
            '.font': {
                fontFamily: name
            }
        })
        
        cache[ url ] = styles.font;
    
    }
    
    return cache[ url ];
    
}