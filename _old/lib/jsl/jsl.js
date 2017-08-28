var { permutationCombination } = require('js-combinatorics');

var val = x => {
    if ( typeof x === 'number' ) {
        return Math.floor( x ) === x ? x + '.' : x.toString();
    }
    if ( typeof x !== 'string' ) {
        throw new Error( 'Invalid GLSL variable ' + x );
    }
    return x;
}

var op = symbol => {
    
    var ctor = ( ...args ) => {
        
        if ( args.length > 2 ) return ctor( ctor( ...args.slice( 0, -1 ) ), args[ args.length - 1 ] );
        
        return '(' + val( args[ 0 ] ) + symbol + val( args[ 1 ] ) + ')';
        
    }
    
    return ctor;
}

var call = ( name, ...args ) => name + '(' + args.map( val ).join(',') + ')';

var ops ={
    add: op('+'),
    subtract: op('-'),
    multiply: op('*'),
    divide: op('/')
}

var utils = {
    call,
    element: ( value, idx ) => `${ value }[${ idx }]`,
    swizzle: ( value, field ) => `${ value }.${ field }`,
}

var swizzles = [ 'xyzw', 'rgba', 'stpq' ].reduce( ( swizzles, mask ) => {
    
    permutationCombination( mask.split('') ).forEach( fields => {
        
        var f = fields.join('');
        
        swizzles[ f ] = value => utils.swizzle( value, f );
        
    })
    
    return swizzles;
    
}, {} );

var builtins = [
    'vec2',
    'vec3',
    'vec4',
    'radians',
    'degrees',
    'sin',
    'cos',
    'tan',
    'asin',
    'acos',
    'atan',
    'pow',
    'exp',
    'log',
    'exp2',
    'log2',
    'sqrt',
    'inversesqrt',
    'abs',
    'sign',
    'floor',
    'ceil',
    'fract',
    'mod',
    'min',
    'max',
    'clamp',
    'mix',
    'step',
    'smoothstep',
    'length',
    'distance',
    'dot',
    'cross',
    'normalize',
    'faceforward',
    'reflect',
    'refract',
    'matrixCompMult',
    'lessThan',
    'lessThanEqual',
    'greaterThan',
    'greaterThanEqual',
    'equal',
    'notEqual',
    'any',
    'all',
    'not',
    'texture2DLod',
    'texture2DProjLod',
    'textureCubeLod',
    'texture2D',
    'texture2DProj',
    'textureCube'
].reduce( ( builtins, name ) => {
    
    builtins[ name ] = ( ...args ) => call( name, ...args );
    
    return builtins;
    
}, {})

var compiler = ( inVar, outVar ) => ({
    main,
    precision = 'highp',
    uniforms = {},
    attributes = {}
}) => {
    
    if ( typeof main === 'function' ) main = main( inVar );
    
    var src = [];
    
    src.push( `precision ${ precision } float;` );
    
    src.push( '' );
    
    for ( var a in attributes ) {
        
        src.push( `attribute ${ attributes[ a ] } ${ a };` );
        
    }
    
    src.push('');
    
    for ( var u in uniforms ) {
        
        src.push( `uniform ${ uniforms[ u ] } ${ u };` );
        
    }
    
    src.push('');
    
    src.push('void main () {');
    
    src.push(`${ outVar } = ${ main };`);
    
    src.push('}');
    
    return src.join('\n');
    
}

var compilers = {
    vert: compiler( '', 'gl_Position' ),
    frag: compiler( 'gl_FragCoord', 'gl_FragColor')
}

module.exports = Object.assign( compilers, builtins, ops, swizzles, utils );