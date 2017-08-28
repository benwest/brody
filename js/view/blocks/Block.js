var m = require('mithril');
var j2c = require('mithril-j2c');

var styles = j2c.attach({
    '.debug': {
        position: 'relative',
        '&:hover': {
            ' .output': {
                display: 'block'
            }
        }
    },
    '.output': {
        display: 'none'
    }
})

var DEBUG = true;

var types = {
    introduction: require('./Introduction'),
    // stack: require('./Stack'),
    text: require('./Text'),
    visuals: require('./Visuals'),
    // image: require('./Images'),
    hero: require('../hero/Hero'),
    // slider: require('./Slider')
}

var debug = ( type, attrs ) => {
    
    var style = {
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'white',
        color: 'red',
        zIndex: 120
    }
    
    var type = m( 'li', m('strong', type ) );
    
    var attrs = Object.keys( attrs ).map( key => {
        
        var value = attrs[ key ].toString().substring(0, 50);
        return m('li', key + ': ' + value )
        
    })
    
    return <ul class={ styles.output } style={ style }>{ type }{ attrs }</ul>
    
}

module.exports = {
    
    view: ({
        attrs: { type, attrs }
    }) => {
        
        if ( !( type in types ) ) {
            
            return <div>!{ type }</div>;
            
        }
        
        if ( DEBUG ) {
            
            return (
                <div class={ styles.debug }>
                    { debug( type, attrs ) }
                    { m( types[ type ], attrs ) }
                </div>
            )
            
        } else {
            
            return m( types[ type ], attrs );
            
        }
        
        
    }
    
}