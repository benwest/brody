var m = require('mithril');
var j2c = require('j2c');
var Fixer = require('../modules/Fixer');
var viewport = require('../utils/viewport');
var omit = require('lodash/omit');
var { margin } = require( '../utils/metrics' );
var Frame = require('./Frame');
var getColor = require('./colors');

var initStructure = item => {
    
    if ( item.type === 'list' ) {
        
        var children = item.attrs.children;
        var title = item.attrs.title;
        var rest = omit( item.attrs, 'children', 'title' );
        
        return {
            type: 'list',
            attrs: Object.assign( rest, {
                x: 0, y: 0, absY: 0, w: 1, h: 1, scrollTop: 0,
                children: children.map( initStructure ),
                title: {
                    text: title,
                    y: 0
                }
            })
        }
        
    } else {
        
        var title = item.attrs.title;
        var rest = omit( item.attrs, 'title' );
        
        return {
            type: item.type,
            attrs: Object.assign( rest, {
                x: 0, y: 0, w: 0, absY: 0, h: 0,
                title: {
                    text: title,
                    y: 0
                }
            })
        };
        
    }
    
}

var color = ( item, depth = 0 ) => {
        
    item.attrs.color = getColor( depth );
    
    if ( item.type === 'list' ) {
        
        item.attrs.children.forEach( item => color( item, depth + 1 ) )
        
    }
    
    return item;
    
}

var layout = ( item, parentW, parentH, margin ) => {
    
    var w = parentW - ( margin[ 1 ] + margin[ 3 ] );
    var h = parentH - ( margin[ 0 ] + margin[ 2 ] );
    
    item.attrs.x = margin[ 3 ];
    item.attrs.y = margin[ 0 ];
    item.attrs.w = w;
    item.attrs.h = h;
    
    if ( item.type === 'list' ) {
        
        item.attrs.children.forEach( child => {
            
            layout( child, w, h, margin )
            
        })
        
    }
    
};

var scroll = ( list, top ) => {
    
    list.attrs.scrollTop = 0;
    
    var l = list.attrs.children.length;
    
    list.attrs.children.forEach( ( item, i ) => {
        
        if ( item.type === 'list' ) {
            
            top = scroll( item, top );
            
        }
        
        if ( i < l - 1 ) {
            
            var d = Math.min( list.attrs.h, top );
            list.attrs.scrollTop += d;
            top -= d;
        
        }
        
    });
    
    return top;
    
};

var titles = ( list, offset = 0 ) => {
    
    list.attrs.children.forEach( ( item, i ) => {
        
        var base = i * list.attrs.h - list.attrs.scrollTop;
        var bottom = Math.min( base + item.attrs.h, offset );
        
        item.attrs.title.y = Math.max( base, bottom );
        
        if ( item.type === 'list' ) {
            
            titles( item, offset - base );
            
        }
        
    })
    
}

var scrollHeight = ( list, anchors, total = 0 ) => {
    
    list.attrs.children.forEach( ( item, i ) => {
        
        if ( item.attrs.anchor ) anchors[ item.attrs.anchor ] = total;
        
        if ( i < list.attrs.children.length - 1 ) total += list.attrs.h;
        
        if ( item.type === 'list' ) {
            
            total = scrollHeight( item, anchors, total );
            
        }
        
    })
    
    return total;
    
    // var ownHeight = list.attrs.h * ( list.attrs.children.length - 1 );
    
    // return list.attrs.children
    //     .filter( item => item.type === 'list' )
    //     .reduce( ( total, item ) => {
            
    //         if ( item.attrs.anchor ) anchors[ item.attrs.anchor ] = total;
            
    //         return total + scrollHeight( item, anchors );
            
    //     }, ownHeight );
    

}

module.exports = {
    
    oninit: ({ attrs, state }) => {
        
        state.root = color( initStructure( attrs.structure ) );
        
    },
    
    view: ({ attrs: { scrollAnchors }, state: { root } }) => {
        
        layout( root, viewport.w, viewport.h, margin() );
        
        var getContent = progress => {
            
            scroll( root, progress );
            
            titles( root );
            
            return <Frame { ...root.attrs }/>
            
        }
        
        return (
            <Fixer
                width={ viewport.w }
                height={ viewport.h }
                scrollHeight={ scrollHeight( root, scrollAnchors ) }
                getContent={ getContent }
            />
        );
        
    }
    
}