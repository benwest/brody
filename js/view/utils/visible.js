var viewport = require('./viewport');

module.exports = rect => {
    
    var { top, height } = rect;
    
    return top + height > 0 && top < viewport.h;
    
}