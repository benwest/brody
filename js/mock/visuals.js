var { cartesianProduct } = require('js-combinatorics');
var range = require('lodash/range');

var imageFile = {
    "type": "image",
    "srcs": [{
        "w": 1200,
        "h": 800,
        "url": "/assets/img/Channel4.Web2_.jpg"
    }]
};

var videoFile = {
    type: "video",
    w: 1280,
    h: 720,
    url: '/assets/img/IMG_5086.MOV.mov'
}

var file = () => Math.random() > .9 ? videoFile : imageFile;

var sizes = [ 'small', 'medium', 'large' ];
var positions = [ 'left', 'right', 'center' ];
var gutters = [ true, false ];

var make = ( fileCounts, sizes, positions, gutters ) => {
    
    return cartesianProduct( fileCounts, sizes, positions, gutters )
        .map(([ fileCount, size, position, gutter ]) => {
            
            var files = range( fileCount ).map( file );
            
            files.toString = () => fileCount.toString();
            
            return {
                type: 'visuals',
                attrs: { size, position, gutter, files }
            }
            
        })
    
}

module.exports = make( [ 1, 2, 3 ], sizes, positions, gutters )