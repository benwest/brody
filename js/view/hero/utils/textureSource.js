var loadImage = require('../../utils/loadImage');

var loadTexture = src => loadImage( src.url ).then( img => {
    
    if ( src.url.indexOf( '.svg' ) === -1 ) {
        
        return img;
        
    } else {
        
        var canvas = document.createElement( 'canvas' );
        canvas.width = src.w;
        canvas.height = src.h;
        var ctx = canvas.getContext( '2d' );
        ctx.drawImage( img, 0, 0, src.w, src.h );
        
        return canvas;
        
    }
    
})

var source = ( regl, file ) => {

    var tex = regl.texture({
        mag: 'linear',
        min: 'linear',
        data: [[ 0, 0, 0, 0 ]]
    });
    
    var srcs = file.srcs.filter( src => src.w > 1 );
    
    var curr = -1;
    
    var imgs = file.srcs.map( () => false );
    
    return size => {
        
        var bigEnough = srcs.findIndex( src => src.w >= size[ 0 ] && src.h >= size[ 1 ] );
        if ( bigEnough === -1 ) bigEnough = srcs.length - 1;
        var biggestLoaded = imgs.findIndex( img => img !== false );
        
        if ( biggestLoaded < bigEnough ) {
            
            loadTexture( srcs[ bigEnough ] )
                .then( img => imgs[ bigEnough ] = img );
            
        }
        
        var idx = Math.min( biggestLoaded, bigEnough );
        
        if ( idx !== curr ) {
            
            tex({ data: imgs[ idx ] });
            
            curr = idx;
            
        }
        
        return tex;
        
    }
    
}

module.exports = regl => {
    
    var sources = {};
    
    return ( file, size ) => {
        
        if ( !sources[ file.id ] ) {
            
            sources[ file.id ] = source( regl, file );
            
        }
        
        return sources[ file.id ]( size );
        
    }
    
};