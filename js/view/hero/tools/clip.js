module.exports = {
    
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
                x: offset[ 0 ] * ctx.pixelRatio,
                y: offset[ 1 ] * ctx.pixelRatio,
                width: size[ 0 ] * ctx.pixelRatio,
                height: size[ 1 ] * ctx.pixelRatio
            }
            
        }
        
    },
    
};