precision mediump float;

uniform bool contain;
uniform float scale;
uniform vec2 resolution, textureSize, offset;
uniform vec4 innerBox, outerBox, background;
uniform sampler2D texture;

vec2 center ( vec2 src, vec2 dest ) {
    
    
}

float containScale ( vec2 src, vec2 dest ) {
    
    return min( dest.x / src.x, dest.y / src.y );
    
}

float coverScale ( vec2 src, vec2 dest ) {
    
    return max( dest.x / src.x, dest.y / src.y );
    
}

vec2 getTexCoord ( vec2 p ) {
    
    vec2 maxOffset = resolution * ( 1. - ( 1. / scale ) );
    
    float fit;
    
    if ( contain ) {
        
        fit = containScale( textureSize, resolution );
        
    } else {
        
        fit = coverScale( textureSize, resolution );
        
    }
    
    p += offset * maxOffset;
    
    p += center( textureSize * fit, resolution );
    
    return p / ( textureSize * fit * scale );
    
}

float linearGradient ( p1, p2 ) {
    
    
    
}

void main () {
    
    // vec2 x = vec2( 1., 1. ) + 1.;
    
    vec2 p = gl_FragCoord.xy;
    p.y = resolution.y - p.y;
    
    vec2 px = vec2( 1. ) / resolution;
    
    vec2 texCoord = getTexCoord( p );
    
    vec4 tex = texture2D( texture, texCoord );
    
    float frame = 
        step( 0., texCoord.x ) *
        step( texCoord.x, 1. ) *
        step( 0., texCoord.y ) *
        step( texCoord.y, 1. );
        
    vec4 color = mix( background, tex, frame );
    
    float alpha = 
        smoothstep( outerBox[ 0 ] - px.x, innerBox[ 0 ], p.x ) *
        smoothstep( outerBox[ 1 ] - px.y, innerBox[ 1 ], p.y ) *
        smoothstep( outerBox[ 2 ] + px.x, innerBox[ 2 ], p.x ) *
        smoothstep( outerBox[ 3 ] + px.y, innerBox[ 3 ], p.y );
    
    // gl_FragColor = color * alpha;
    
    gl_FragColor = vec4( vec3( linearGradient( p ) ) )
    
}