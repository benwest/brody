var { cartesianProduct } = require('js-combinatorics');

var directions = [ 'up', 'down', 'left', 'right' ];
var orders = [ 'up', 'down' ];
var insets = [ true, false ];
var fits = [ 'cover', 'contain' ];

var file1 = {
    "type": "image",
    "srcs": [{
        "w": 1200,
        "h": 800,
        "url": "/assets/img/Channel4.Web2_.jpg"
    }]
};

var file2 = {
    "type": "image",
    "srcs": [{
        url: '/assets/img/BA.Web.TestStories.RCA.Image.7.jpg',
        w: 803,
        h: 1200
    }]
};

module.exports = cartesianProduct( directions, orders, insets, fits ).map(([ direction, order, inset, fit ]) => {
    
    return {
        type: 'stack',
        attrs: {
            direction, order, inset, fit,
            files: [ file1, file2 ]
        }
    }
    
})