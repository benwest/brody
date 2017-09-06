module.exports = {
    
    frag: `
        precision mediump float;
        
        uniform vec4 color;
        
        void main () {
            
            gl_FragColor = color;
            
        }
        
    `,
    
    uniforms: {
        
        color: 'prop:color'
        
    }
    
}