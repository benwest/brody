var defs = [{
    name: 'phone',
    min: 0,
    max: 736
},{
    name: 'tablet',
    min: 737,
    max: 1023
},{
    name: 'tabletLandscape',
    min: 1024,
    max: 1199
},{
    name: 'desktop',
    min: 1200,
    max: 1599
},{
    name: 'desktopLarge',
    min: 1600,
    max: Infinity
}].map( ({ name, min, max }, i ) => {
    
    var media = `@media ( min-width: ${ min }px )`;
    //if ( isFinite( max ) ) media += ` and ( max-width: ${ max }px )`
    
    return { name, min, max, i, toString: () => media };
    
})

var get = w => defs.find( ({ min, max }) => w >= min && w < max );

var breakpoint = {
    
    curr: get( window.innerWidth )
    
}

window.addEventListener( 'resize', () => breakpoint.curr = get( window.innerWidth ) );

var fill = v => {
    
    if ( !Array.isArray( v ) ) v = [ v ];
    
    while ( v.length < defs.length ) v.push( v[ v.length - 1 ] );
    
    return v;
    
}

var _switch = ( values, breakpoint ) => fill( values )[ breakpoint.i ];

var responsive = values => breakpoint => _switch( values, breakpoint );

var dict = defs.reduce( ( dict, def ) => {
    
    dict[ def.name ] = def;
    return dict;
    
}, {})

var forEach = fn => defs.forEach( fn );
var map = fn => defs.map( fn );

var indexed = defs.reduce( ( indexed, def, i ) => {
    
    indexed[ i ] = def;
    return indexed;
    
}, [] )

var mediaQueries = ( rsps, transform ) => {
    
    if ( !Array.isArray( rsps ) ) rsps = [ rsps ];
    
    var css = {};
    
    forEach( breakpoint => {
        
        css[ breakpoint ] = transform( ...rsps.map( r => r( breakpoint ) ) );
        
    })
    
    return css;
    
}

module.exports = Object.assign(
    dict,
    indexed,
    breakpoint,
    { switch: _switch, responsive, forEach, map, get, defs, mediaQueries }
)