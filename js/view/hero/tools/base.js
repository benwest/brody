module.exports = {
    
    context: {
        
        viewport: ctx => {
            
            return [ ctx.drawingBufferWidth, ctx.drawingBufferHeight ];
            
        }
        
    },
    
    vert: `
        precision mediump float;

        attribute vec2 position;
        varying vec2 uv;
        
        uniform vec2 resolution;
        uniform vec2 size;
        uniform vec2 offset;
        
        void main () {
            
            uv = position;
            
            vec2 p = position;
            p *= size;
            p += offset;
            p.y = resolution.y - p.y;
            p -= resolution / 2.;
            p /= resolution;
            p *= 2.;
            
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