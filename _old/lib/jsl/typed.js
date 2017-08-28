var jsl = {};

var vectorType = length => {
    
    
    
}

var throwTypeError = ( expectedType, passedType, name ) => {
    
    throw new Error( `Expected ${ expectedType }, got ${ passedType }${ name ? `in ${ name }` : '' }` );
    
}

var throwIfTypeMismatch = ( expectedType, passedType, name ) => {
    
    if ( expectedType !== passedType ) throwTypeError( expectedType, passedType, name );
    
}

var wrapFunc = ( type, name, argTypes = {}, body ) => args => {
    
    for ( var a in argTypes ) {
        
        throwIfTypeMismatch( type( argTypes[ a ] ), type( args[ a ] ) );

    }
    
}

var func = ( ...args ) => {
    
    if ( args.length === 4 ) {
        
        return wrapFunc( ...args );
        
    } else if ( args.length === 3 ) {
        
        return wrapFunc( args[ 0 ], undefined, args[ 1 ], args[ 2 ] );
        
    } else if ( args.length === 1 ) {
        
        if ( typeof args[ 0 ] === 'function' ) return args[ 0 ];
        
        return wrapFunc( args.type, args.name, args.args, args.body );
        
    }
    
}

var {
    func, frag,
    float, vec2, vec4, sampler2D,
    add, subtract, multiply, divide,
    step, min, max, mix, texture2D
} = jsl;

var frame = func( vec2, 'frame', { p: vec2, frame: vec4 }, ( p, frame ) => {
    
    return multiply(
        step( frame[ 0 ], p.x ),
        step( frame[ 1 ], p.y ),
        step( p.x, frame[ 2 ] ),
        step( p.y, frame[ 3 ] )
    )
    
});

var center = func( vec2, { src: vec2, dest: vec2 }, ({ src, dest }) => {
    return divide( subtract( src, dest ), 2 );
})

var fit = compareFunc => func( float, { src: vec2, dest: vec2 }, ({ src, dest }) => {
    return compareFunc( divide( dest.x, src.x ), divide( dest.y, src.y ) );
})

var containScale = fit( min );
var coverScale = fit( max );

var getTexCoord = scaleFn => func({
    
    type: vec2,
    
    args: {
        p: vec2,
        scale: float,
        textureSize: vec2,
        resolution: vec2,
        offset: vec2,
        texture: sampler2D
    },
    
    body: ({ p, scale, textureSize, resolution, offset, texture }) => {
        
        var maxOffset = float( 1 ).subtract( float( 1 ).divide( scale ) ).multiply( resolution );
        
        var fit = scaleFn( { src: textureSize, dest: resolution } );
        
        var scaleOffset = offset.multiply( maxOffset );
        
        var centerOffset = center( { src: textureSize.multiply( fit ), dest: resolution } );
        
        var offsetP = p.add( scaleOffset, centerOffset );
        
        return divide( offsetP, multiply( textureSize, fit, scale ) );
        
    }
        
});

var mask = func( float, { p: vec2, resolution: vec2, inner: vec4, outer: vec4 }, ( { p, inner, outer } ) => {
    
    var px = divide( vec2( 1 ), resolution );
    
    return multiply(
        smoothstep( outer[ 0 ].subtract( px.x ) )
    )
});

var getTexCoordContained = getTexCoord( containScale );
var getTexCoordCovered = getTexCoord( coverScale );

frag({
    
    uniforms: {
        resolution: vec2,
        textureSize: vec2,
        scale: float,
        offset: vec2,
        background: vec4
    },
    
    main: (
        gl_FragCoord,
        {
            resolution,
            textureSize,
            scale,
            offset,
            texture,
            background
        }
    ) => {
        
        var p = vec2( gl_FragCoord.x, subtract( resolution.y, gl_FragCoord.y ) );
        
        var texCoord = getTexCoord( { p, scale, textureSize, resolution, offset } );
        
        var tex = texture2D( texture, texCoord );
        
        var color = mix( background, tex, frame({ p, frame: vec2( 0, 1 ) }) );
        
    }
})