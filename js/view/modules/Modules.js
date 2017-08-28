var m = require('mithril');

var Background = require('./Background');
var Module = require('./Module');

var group = blocks => blocks.reduce( ( backgrounds, block ) => {
    
    if ( block.type === 'background' ) {
        
        backgrounds.push( { blocks: [], attrs: block.attrs } );
        
        return backgrounds;
        
    } else if ( backgrounds.length === 0 ) {
        
        backgrounds.push( { blocks: [], color: '#000' } );
        
    }
    
    backgrounds[ backgrounds.length - 1 ].blocks.push( block );
    
    return backgrounds;
    
}, [] );

module.exports = {
    
    oninit: ({ attrs: { blocks, meta }, state }) => {
        
        state.backgrounds = group( blocks );
        
        state.style = {
            color: meta.textColor
        };
        
    },
    
    view: ({ state: { style, backgrounds } }) => {
        
        var backgrounds = backgrounds.map( ( background, i ) => {
            
            var blocks = background.blocks.map( ( block, i ) => {
                
                return <Module key={ i } { ...block }/>;
                
            })
            
            return (
                <Background key={ i } { ...background.attrs }>
                    { blocks }
                </Background>
            )
            
        });
        
        return <div style={ style }>{ backgrounds }</div>;
        
    }
    
}