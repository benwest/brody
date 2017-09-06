var Hero = require('./Hero');
var loadImage = require('../utils/loadImage');
var createTools = require('./tools');
var viewport = require('../utils/viewport')
var vec2 = require('gl-vec2');
var mouse = require('./mouse');

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

var texture = ( context, file ) => {
    
    var tex = context.texture({
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
    
};

var renderer = context => {
    
    var tools = createTools( context );
    
    var draw = obj => {
        
        var tool = tools[ obj.type ];
        
        tool( obj.uniforms );
        
        obj.children.forEach( draw );
        
    }
    
    return draw;
    
};

var fit = ( out = vec2.create(), [ srcW, srcH ], [ destW, destH ], fit = 'cover' ) => {
    var fn = fit === 'contain' ? Math.min : Math.max;
    var scale = fn( destW / srcW, destH / srcH );
    out[ 0 ] = srcW * scale;
    out[ 1 ] = srcH * scale;
    return out;
}

module.exports = Hero({
    
    load: ( context, attrs ) => {
        
        return Promise.resolve();
        
    },
    
    init: ( context, { attrs: { layers, depth } } ) => {
        
        // var { color, texture } = tools( context );
        
        mouse.subscribe();
        
        var draw = renderer( context );
        
        var scene = layers.map( layer => {
            
            return {
                type: 'texture',
                attrs: {
                    texture: texture( context, layer.file ),
                    ratio: layer.file.h / layer.file.w,
                    fit: layer.fit
                },
                uniforms: {
                    texture: null,
                    size: [ 1, 1 ],
                    offset: [ 0, 0 ],
                    alpha: 1
                },
                children: []
            };
            
        });
        
        return ctx => {
            
            var clipSize = [ ctx.drawingBufferWidth / ctx.pixelRatio, ctx.drawingBufferHeight / ctx.pixelRatio ]
            
            var vp = vec2.fromValues( viewport.w, viewport.h );
            
            var center = vec2.scale( [], clipSize, .5 );
            
            var m = vec2.divide( [], mouse.get(), vp );
            vec2.scale( m, m, 2 );
            vec2.subtract( m, m, [ 1, 1 ] );
            
            var d = Math.min( vp[ 0 ], vp[ 1 ] ) * depth * .1;
            
            scene.forEach( ( { uniforms, attrs }, i ) => {
                
                var parallax = ( layers.length - i ) * d;
                
                var size = vec2.create();
                
                if ( attrs.fit === 'cover' ) {
                    
                    vec2.add( size, vp, vec2.fromValues( parallax * 2, parallax * 2 ) );
                    
                } else {
                    
                    vec2.copy( size, clipSize );
                    
                }
                
                size = fit( [], vec2.fromValues( 1, attrs.ratio ), size, attrs.fit );
                
                var offset = vec2.subtract( [], center, vec2.scale( [], size, .5 ) );
                
                vec2.add( offset, offset, vec2.scale( [], m, parallax ) );
                
                uniforms.size = size;
                uniforms.offset = offset;
                uniforms.texture = attrs.texture( size );
                uniforms.alpha = 1;
                
                // texture({
                //     size,
                //     offset,
                //     texture: layer.texture( size ),
                //     clipOffset, clipSize
                // })
                
            });
            
            scene.forEach( draw );
            
        }
        
    }
    
})