var m = require('mithril');
var j2c = require('mithril-j2c');
var Container = require('./Container');
var redraw = require('../utils/redraw');
var GL_SUPPORTED = require('./isGLSupported');
var rAF = require('../utils/rAF');
var regl = require('regl');
var lazyRect = require('../utils/lazyRect');

var DPR = window.devicePixelRatio || 1;

var styles = j2c.attach({
    '.canvas': {
        width: '100%',
        height: '100%',
        background: 'black',
        '@keyframes fade-in': {
            ' from': { opacity: 0 },
            ' to': { opacity: 1 }
        },
        // animation: 'fade-in 1s'
    }
})

module.exports = ({ load, init }) => {
    
    var Shader = {
        
        loaded: false,
        
        initialized: false,
        
        assets: [],
        
        context: null,
        
        // oncreate: ({ state, attrs, dom }) => {
            
        //     if ( !GL_SUPPORTED ) return;
            
            
            
        // },
        
        onupdate: ({ attrs, state, dom }) => {
            
            if ( !GL_SUPPORTED ) return;
            
            if ( !state.initialized ) {
                
                state.context = regl( dom );
                
                state.initialized = true;
            
                load( state.context, attrs ).then( assets => {
                    
                    state.rect = lazyRect.subscribe( dom );
                    
                    var draw = init( state.context, { assets, attrs } );
                    
                    state.frame = state.context.frame( ( ...args ) => {
                        
                        var { width, height } = lazyRect.get( state.rect );
                        
                        if ( width * DPR !== dom.width || height * DPR !== dom.height ) {
                            dom.width = width * DPR;
                            dom.height = height * DPR;
                        }
                        
                        draw( ...args );
                        
                    });
                    
                    redraw( 'hero load' );
                    
                })
                
            }
            
        },
        
        onremove: ({ state }) => {
            
            state.frame.cancel();
            state.context.destroy();
            lazyRect.unsubscribe( state.rect );
            
        },
        
        view: ({ state: { loaded }, attrs: { thumbnail } }) => {
            
            return loaded && GL_SUPPORTED ?
                    <canvas class={ styles.canvas }/>
                :
                    <div class={ styles.canvas }/>
            
        }
        
    }
    
    return {
        
        view: ({ attrs }) => {
            
            return (
                <Container masthead={ attrs.masthead }>
                    <Shader { ...attrs }/>
                </Container>
            )
            
        }
        
    }
    
}