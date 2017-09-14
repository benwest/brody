var m = require('mithril');

var Background = require('./Background');
var Module = require('./Module');

var group = modules => modules.reduce( ( backgrounds, module ) => {
    
    if ( module.type === 'background' ) {
        
        backgrounds.push( { modules: [], attrs: module.attrs } );
        
        return backgrounds;
        
    } else if ( backgrounds.length === 0 ) {
        
        backgrounds.push( { modules: [], attrs: { color: '#000' } } );
        
    }
    
    backgrounds[ backgrounds.length - 1 ].modules.push( module );
    
    return backgrounds;
    
}, [] );

module.exports = {
    
    scrollAnchors: {},
    
    onremove: () => {
        
        // console.log('bye');
        
    },
    
    view: ({ attrs: { modules, meta }, state: { scrollAnchors } }) => {
        
        var backgrounds = group( modules ).map( ( background, i ) => {
            
            var modules = background.modules.map( ( module, i ) => {
                
                return <Module scrollAnchors={ scrollAnchors } { ...module }/>;
                
            })
            
            return (
                <Background { ...background.attrs }>
                    { modules }
                </Background>
            )
            
        });
        
        var style = {
            color: meta.textColor || 'white'
        };
        
        return <div key={ meta.id } style={ style }>{ backgrounds }</div>;
        
    }
    
}