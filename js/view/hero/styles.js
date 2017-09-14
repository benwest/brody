var j2c = require('mithril-j2c');

module.exports = j2c.attach({
    '.background': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        contain: 'strict',
        '& > *': {
            pointerEvents: 'none'
        }
    }
})