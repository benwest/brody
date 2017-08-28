var regl = require( 'regl' );
var fader = require( './fader' );
var loadImage = require('../lib/loadImage');

var layer = regl();
// var color1 = fader( layer, { gradientCount: 2, use_texture: 0 })

// color1();

var frag = require('./fader.glsl');

frag = '#define use_texture 0\n#define gradientCount 2\n\n' + frag;

var draw = layer({
    
     vert: `
        precision mediump float;
        attribute vec2 aPosition;
        varying vec2 position;
        void main () {
            position = aPosition;
            gl_Position = vec4(aPosition, 0, 1); 
        }
    `,
    
    frag,
    
    attributes: {
        
        aPosition: [
            [ -1,  3 ],
            [ -1, -1 ],
            [  3, -1 ]
        ]
        
    },
    
    count: 3,
    
    uniforms: {
        
        resolution: ({ drawingBufferWidth, drawingBufferHeight }) => {
    
            return [ drawingBufferWidth, drawingBufferHeight ];
            
        },
        
        background: [ 0, 0, 0, 0 ],
        
        contain: false,
        
        'gradientPoints[0]': layer.prop('g0'),
        
        'gradientPoints[1]': layer.prop('g1'),
        
    }
    
});

layer.frame( ({time}) => {
    
    layer.clear({color: [0, 0, 0, 0]});
    
    draw({
        'g0': [ -.5, -.5 ],
        'g1': [ Math.sin( time ), .5 ]
    })
    
})