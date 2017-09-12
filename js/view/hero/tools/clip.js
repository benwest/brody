module.exports = regl => regl({
    
    context: {
        
        clipOffset: ( ctx, props ) => {
            
            return props.clipOffset || [ 0, 0 ];
            
        },
        
        clipSize: ( ctx, props ) => {
            
            return props.clipSize || ctx.viewport;
            
        }
        
    },
    
    scissor: {
        
        enable: true,
        
        box: ctx => {
            
            var offset = ctx.clipOffset;
            var size = ctx.clipSize;
            
            return {
                x: offset[ 0 ],
                y: offset[ 1 ],
                width: size[ 0 ],
                height: size[ 1 ]
            }
            
        }
        
    },
    
});