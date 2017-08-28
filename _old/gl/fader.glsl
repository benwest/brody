precision highp float;

uniform vec2 resolution;
uniform vec2 gradientPoints[ gradientCount ];
uniform vec4 background;
uniform bool contain;

#if use_texture
    uniform sampler2D texture;
#endif

vec2 position ( vec2 p ) {
    
    return vec2(
        p.x / resolution.x,
        1. - p.y / resolution.y
    ) * 2. - 1.;
    
}

float mark ( vec2 p, vec2 point ) {
    return step( length( p - point ), .05 );
}

float linearGradient ( vec2 p, vec2 start, vec2 end ) {
    
    return abs( length( start - p ) - length( end - p ) );
    
}

float mask ( vec2 p ) {
    
    float color = 1.;
    
    for ( int i = 0; i < gradientCount; i += 2 ) {
        
        vec2 start = gradientPoints[ i ];
        vec2 end = gradientPoints[ i + 1 ];
        
        color *= linearGradient( p, start, end );
        // color += mark( p, start );
        // color += mark( p, end );
        
        // color *= smoothstep( 0., 1., p.x );
        
        // color *= linearGradient( p, gradientPoints[ i ], gradientPoints[ i + 1 ] );
        
    }
    
    return color;
    
}

void main () {
    
    vec2 p = position( gl_FragCoord.xy );
    
    vec4 color = background;
    
    #if use_texture
    
    #endif
    
    gl_FragColor = vec4( vec3( mask( p ) ), 1. );
    
}