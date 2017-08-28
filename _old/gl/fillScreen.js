module.exports = {
    
    vert: `
        precision mediump float;
        attribute vec2 aPosition;
        varying vec2 position;
        void main () {
            position = aPosition;
            gl_Position = vec4(aPosition, 0, 1); 
        }
    `,
    
    attributes: {
        
        aPosition: [
            [ -1,  3 ],
            [ -1, -1 ],
            [  3, -1 ]
        ]
        
    },
    
    uniforms: {
        
        resolution: ({ drawingBufferWidth, drawingBufferHeight }) => {
    
            return [ drawingBufferWidth, drawingBufferHeight ];
            
        }
        
    },
    
    depth: {
        
        enable: false
        
    },
    
    blend: {
        
        enable: true,
      
        func: {
        
            src: 'src alpha',
        
            dst: 'dst alpha'
        }
        
    },
    
    count: 3
    
}