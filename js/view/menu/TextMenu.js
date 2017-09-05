var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');
var { baseline } = require('../utils/metrics');
var { mediaQueries } = require('../utils/breakpoints');

var styles = j2c.attach({
    
    '.root': mediaQueries( baseline, x => ({ padding: `0 0 ${ x * 5 }px ${x}px` }) ),
    // {
    //     [ breakpoints.tablet ]: {
    //         padding: '0 0 0 35px'
    //     }
    // },
    
    '.link': {
        lineHeight: '35px',
        transition: 'color 2s, transform 2s',
        display: 'block',
        color: '#9C9B9B'
    },
    
    '.active': {
        color: 'white',
        ' ': mediaQueries( baseline, x => ({ transform: 'translateX(35px)' }) ),
        transition: 'color .25s, transform .25s'
    },
    
    '.list': {
        listStyle: 'none',
        margin: 0,
        // padding: '0 0 0 35px',
        ' ': mediaQueries( baseline, x => ({ padding: `0 0 0 ${x}px` }) )
    }
    
})

var Link = {
    
    view: ({
        attrs: { item: { id, url, title, children }, selected, select, link }
    }) => {
        
        var classes = classnames({
            [ styles.link ]: true,
            [ styles.active ]: selected === id// || children.find( child => selected === child.id )
        });
        
        var onmouseenter = url && select( id );
        var onmouseleave = url && select( -1 );
        
        return (
            <a
                id={ 'i' + id }
                class={ classes }
                href={ url }
                onmouseenter={ onmouseenter }
                onmouseleave={ onmouseleave }
                oncreate={ url && link }
            >
                { m.trust( title ) }
            </a>
        )
        
    }
    
}

var TextMenuItem = {
    
    view: ({
        attrs: { item, selected, select, link }
    }) => {
        
        var children = item.children.map( child => {
            
            var attrs = { selected, select, item: child, link }; 
            
            return (
                <li>
                    <TextMenuItem { ...attrs }/>
                </li>
            )
            
        })
        
        return [
            <Link key={ item.id } item={ item } selected={ selected } select={ select } link={ link }/>,
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
        attrs: { selected, select, root, link }
    }) => {
        
        if ( !root ) return;
        
        return (
            <div class={ styles.root }>
                <TextMenuItem selected={ selected } select={ select } item={ root } link={ link } />
            </div>
        )
        
    }
    
};