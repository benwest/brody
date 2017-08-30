var { EnvironmentPlugin } = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');
var isPlainObject = require('lodash/isPlainObject');

module.exports = ifEnv( env => ({
        
    target: 'web',
    
    entry: env({
        
        'production': [ 'babel-polyfill' ],
        
        '*': [
            
            path.resolve( __dirname, 'js', 'client.js' )
            
        ]
        
    }),
    
    devtool: env({
        
        'dev': 'cheap-module-source-map',
        
        'production': 'source-map'
        
    }),
    
    output: {
        
        path: path.resolve( __dirname, 'assets' ),
        
        filename: 'bundle.js',
        
        sourceMapFilename: '[file].map'
        
    },
    
    module: {
        
        loaders: [
            
            {
                
                test: /\.glsl$/,
                
                loaders: [
                    
                    'raw-loader',
                    
                    'glslify-loader'
                    
                ]
                
            },
            
            {
                
                test: /\.js$/,
                
                exclude: /node_modules/,
                
                loaders: [
                    
                    {
                        
                        loader: 'babel-loader',
                        
                        options: {
                            
                            presets: env({
                                
                                'production': [
                                
                                    [ 'env' , { targets: { browsers: 'ie >= 11' } } ]
                            
                                ]
                                
                            }),
                            
                            plugins: env({
                                
                                '*': [ [ 'transform-react-jsx', { pragma: 'm' } ] ],
                                
                                'production': [ 'transform-runtime', 'mopt' ]
                                
                            })
                            
                        }
                        
                    }
                    
                ]
                
            }
            
        ]
        
    },
    
    plugins: env({
        
        '*': [
            
            new EnvironmentPlugin([ 'API_BASE' ])
            
        ],
        
        'production': [
        
            new UglifyJSPlugin({
                
                sourceMap: true,
                
                parallel: true
                
            })
        
        ]
        
    })

}))

var switcher = env => defs => {
        
    var keys = Object.keys( defs );
    var values = keys.map( key => defs[ key ] );
    
    var included = keys
        .filter( key => key === '*' || key in env )
        .map( key => defs[ key ] );
        
    if ( values.every( Array.isArray ) ) {
        
        // Combine array options
        
        return included.reduce( ( a, b ) => a.concat( b ), [] );
        
    } else if ( values.every( isPlainObject ) ) {
        
        // Combine object options
        
        return included.reduce( ( a, b ) => Object.assign( a, b ), {} );
        
    } else if ( included.length === 1 && !( '*' in defs ) ) {
        
        // Single value per environment
        
        return included[ 0 ];
        
    } else {
        
        // One value for enviromnent, one for *
        
        return included;
        
    }
    
}

function ifEnv ( config ) {
    
    return env => config( switcher( env ) );
    
}