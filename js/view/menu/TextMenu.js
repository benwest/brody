var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');
var { baseline } = require('../utils/metrics');
var { mediaQueries } = require('../utils/breakpoints');
var range = require('lodash/range');

var styles = j2c.attach({
    
    '.root': mediaQueries( baseline, x => ({ padding: `0 0 ${ x * 5 }px ${ x }px` }) ),
    // {
    //     [ breakpoints.tablet ]: {
    //         padding: '0 0 0 35px'
    //     }
    // },
    
    '.link': {
        lineHeight: '35px',
        transition: 'color 2s, transform 2s',
        display: 'block',
        color: '#9C9B9B',
        marginLeft: '-500px',
        paddingLeft: '500px'
    },
    
    '.active': {
        color: 'white',
        ' ': mediaQueries( baseline, x => ({ transform: 'translateX(35px)' }) ),
        transition: 'color .25s, transform .25s'
    },
    
    '.list': {
        listStyle: 'none',
        margin: 0,
        // padding: 0
        // padding: '0 0 0 35px',
        ' ': mediaQueries( baseline, x => ({ padding: `0 0 0 ${x}px` }) )
    }
    
})

var Link = {
    
    view: ({
        attrs: { item: { id, url, title, children }, selected, select, onclick }
    }) => {
        
        var classes = classnames({
            [ styles.link ]: true,
            [ styles.active ]: selected === id
        });
        
        var onmouseenter = () => url && select( id );
        var onmouseleave = () => url && select( -1 );
        
        return (
            <a
                class={ classes }
                href={ url }
                onmouseenter={ onmouseenter }
                onmouseleave={ onmouseleave }
                onclick={ url && onclick( url ) }
            >
                { m.trust( title ) }
            </a>
        )
        
    }
    
}

var TextMenuItem = {
    
    view: ({
        attrs: { item, selected, select, onclick }
    }) => {
        
        var children = item.children.map( child => {
            
            var attrs = { selected, select, item: child, onclick }; 
            
            return (
                <li>
                    <TextMenuItem { ...attrs }/>
                </li>
            )
            
        })
        
        return [
            <Link key={ item.id } item={ item } selected={ selected } select={ select } onclick={ onclick }/>,
            children.length ?
                <ul key={ item.id + 'l' } class={ styles.list }>
                    { children }
                </ul>
            :
                ''
        ]
        
    }
    
}

module.exports = {
    
    view: ({
        attrs: { root, selected, select, onclick }
    }) => {
        
        if ( !root ) return;
        
        return (
            <div class={ styles.root }>
                <TextMenuItem item={ root } selected={ selected } select={ select } onclick={ onclick } />
            </div>
        )
        
    }
    
};