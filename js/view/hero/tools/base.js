var DPR = window.devicePixelRatio || 1;

module.exports = {
    
    context: {
        
        viewport: ctx => {
            
            var w = ctx.drawingBufferWidth;
            var h = ctx.drawingBufferHeight;
            
            return [ w / ctx.pixelRatio, h / ctx.pixelRatio ];
            
        }
        
    },
    
    vert: `
        precision mediump float;
        #define DPR ${ DPR }.
        
        attribute vec2 position;
        varying vec2 uv;
        
        uniform vec2 resolution;
        uniform vec2 size;
        uniform vec2 offset;
        
        void main () {
            
            uv = position;
            
            vec2 p = position;
            p *= size * DPR;
            p += offset * DPR;
            p.y = resolution.y - p.y;
            p -= resolution / 2.;
            p /= resolution;
            p *= DPR;
            
            gl_Position = vec4( p, 0., 1. );
            
        }
        
    `,
    
    attributes: {
        
        position: [
            0, 0,
            0, 1,
            1, 0,
            1, 1
        ]
        
    },
    
    uniforms: {
        
        resolution: ({ drawingBufferWidth, drawingBufferHeight }) => {
            
            return [ drawingBufferWidth, drawingBufferHeight ];
            
        },
        
        size: 'prop:size',
        
        offset: 'prop:offset'
        
    },
    
    depth: {
        
        enable: false
        
    },
    
    blend: {
        
        enable: true,
    
        func: {
            srcRGB: 'src alpha',
            srcAlpha: 1,
            dstRGB: 'one minus src alpha',
            dstAlpha: 1
        },
        
        equation: {
            rgb: 'add',
            alpha: 'add'
        },
        
        color: [0, 0, 0, 0]
        
    },
    
    primitive: 'triangle strip',
    
    count: 4
    
}