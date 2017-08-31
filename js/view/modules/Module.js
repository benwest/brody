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

var DEBUG = false;

var types = {
    introduction: require('./Introduction'),
    text: require('./Text'),
    visuals: require('./Visuals'),
    hero: require('../hero/Hero'),
    stack: require('./Stack'),
    slider: require('./Slider'),
    typeTester: require('./TypeTester')
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
        
        var value = key === 'files' ? attrs[ key ].length : attrs[ key ];
        value = value.toString().substring(0, 50);
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