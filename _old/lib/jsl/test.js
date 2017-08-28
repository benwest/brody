var {
    vert, frag,
    add, subtract, multiply, divide,
    vec2, vec3, vec4, texture2D,
    min, max,
    x, y, xy
} = require('./jsl');

console.dir( require('./jsl') );

var regl = require('regl')();

var vertexSrc = vert({
    attributes: {
        position: 'vec2'
    },
    main: vec4( 'position', 0, 1 )
})


var scaleFit = fn => ( src, dest ) => fn( divide( x( dest ), x( src ) ), divide( y( dest ), y( src ) ) );
var scaleContain = scaleFit( min );
var scaleCover = scaleFit( max );

var centerOffset = ( src, dest ) => divide( subtract( src, dest ), 2 );

var from1 = x => subtract( 1, x );
var inverse = x => divide( 1, x );

var maxOffset = ( resolution, scale ) =>
    multiply(
        resolution,
        from1( inverse( scale ) )
    );

var parallax = ( offset, resolution, scale ) => 
    multiply(
        offset,
        maxOffset( resolution, scale )
    );

var texCoord = scaleFit => ( p, textureSize, resolution, scale, offset ) =>
    divide(
        add(
            p,
            parallax( offset, resolution, scale ),
            centerOffset(
                multiply(
                    textureSize,
                    scaleFit( textureSize, resolution )
                ),
                resolution
            )
        ),
        multiply(
            textureSize,
            scaleFit( textureSize, resolution ),
            scale
        )
    );
    
var texCoordCover = texCoord( scaleCover );
var texCoordContain = texCoord( scaleContain );

var fragmentSrc = frag({
    
    uniforms: {
        resolution: 'vec2',
        offset: 'vec2',
        textureSize: 'vec2',
        scale: 'float',
        texture: 'sampler2D'
    },
    
    main: gl_FragCoord => {
        
        var p = divide( xy( gl_FragCoord ), 'resolution' );
        
        return texture2D(
            'texture',
            texCoordCover(
                p,
                'textureSize',
                'resolution',
                'scale',
                'offset'
            )
        );
        
    }
    
})

console.log( vertexSrc, fragmentSrc );

regl({
    
    vert: vertexSrc,
    
    frag: fragmentSrc,
    
    attributes: {
        
        position: [
            [ -1,  3 ],
            [ -1, -1 ],
            [  3, -1 ]
        ]
        
    },
    
    uniforms: {
        
        resolution: [ window.innerWidth * 2, window.innerHeight * 2 ],
        offset: [0, 0],
        
        
    },
    
    count: 3
    
})()