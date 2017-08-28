var resolution = uniform.vec2( 'resolution' );

var p = vec2( gl_FragCoord.x(), subtract( resolution.y(), gl_FragCoord.y() ) )

