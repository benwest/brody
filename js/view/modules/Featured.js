var m = require('mithril');
var Fixer = require('./Fixer');
var Rects = require('../modules/Rects');
var rect = require('../hero/rects');
var viewport = require('../utils/viewport');
var { margin } = require( '../utils/metrics' );

var List = {
    
    render: ({
        uniforms: { position, size, scrollTop, color },
        children
    }) => {
        
        return rect( { position, size, color, clip: true },
            rect( { position: [ 0, -scrollTop ], size: [ 0, 0 ] },
                children
            )
        )
        
    }
    
}

var listModel = ( title, children ) => rect( List,
    {
        title: {
            text: title,
            y: 0
        },
        position: [ 0, 0 ],
        size: [ 0, 0 ],
        color: [ 0, 0, 0 ],
        scrollTop: 0,
    },
    children
)

var color = ( list, depth = 0 ) => {
    
    var v = ( ( depth * 2 + 2 ) * 16 ) / 255;
    
    list.uniforms.color = [ v, v, v ];
    
    list.children.forEach( child => color( child, depth + 1 ) )
    
}

var layout = ( item, parentSize, margin, i = 0 ) => {
    
    item.uniforms.size = [
        parentSize[ 0 ] - ( margin[ 1 ] + margin[ 3 ] ),
        parentSize[ 1 ] - ( margin[ 0 ] + margin[ 2 ] )
    ];
    
    item.uniforms.position = [
        margin[ 3 ],
        parentSize[ 1 ] * i + margin[ 0 ]
    ];
    
    item.children.forEach( ( child, i ) => {
        
        layout( child, item.uniforms.size, margin, i )
        
    });
    
}

var scrollHeight = list => {
    
    var ownHeight = list.uniforms.size[ 1 ] * ( Math.max( list.children.length, 1 ) - 1 );
    
    var childHeight = list.children
        .filter( item => item.component === List )
        .reduce( ( total, item ) => total + scrollHeight( item ), 0 );
    
    return ownHeight + childHeight;
    
}

var scroll = ( list, top ) => {
    
    list.uniforms.scrollTop = 0;
    
    var l = list.children.length;
    
    list.children.forEach( ( item, i ) => {
        
        if ( item.component === List ) {
            
            top = scroll( item, top );
            
        }
        
        if ( i < l - 1 ) {
            
            var d = Math.min( list.uniforms.size[ 1 ], top );
            list.uniforms.scrollTop += d;
            top -= d;
        
        }
        
    });
    
    return top;
    
};

module.exports = {
    
    view: ({ attrs: { disciplines } }) => {
        
        var structure = listModel( 'root',
            disciplines.map( discipline => {
                return listModel( discipline.name,
                    discipline.projects.map( project => {
                        return listModel( project.title, [] )
                    })
                )
            })
        )
        
        color( structure );
        
        layout( structure, [ viewport.w, viewport.h ], margin() );
        
        var getContent = top => {
            
            scroll( structure, top );
            
            return <Rects root={ structure }/>;
            
        }
        
        return <Fixer
            width={ viewport.w }
            height={ viewport.h }
            scrollHeight={ scrollHeight( structure ) }
            getContent={ getContent }
        />
        
    }
    
}