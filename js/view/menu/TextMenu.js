var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');
var { baseline } = require('../utils/metrics');
var { mediaQueries } = require('../utils/breakpoints');

var styles = j2c.attach({
    
    '.root': mediaQueries( baseline, x => ({ padding: `0 0 0 ${x}px` }) ),
    // {
    //     [ breakpoints.tablet ]: {
    //         padding: '0 0 0 35px'
    //     }
    // },
    
    '.link': {
        lineHeight: '35px',
        transition: 'opacity .25s',
        display: 'block'
    },
    
    '.dimmed': {
        opacity: .5
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
        attrs: { item: { id, url, title }, selected, select }
    }) => {
        
        var classes = classnames({
            [ styles.link ]: true,
            [ styles.dimmed ]: selected !== -1 && selected !== id
        });
        
        var onmouseenter = url && select( id );
        var onmouseleave = url && select( -1 );
        
        return (
            <a class={ classes } href={ url } onmouseenter={ onmouseenter } onmouseleave={ onmouseleave }>
                { m.trust( title ) }
            </a>
        )
        
    }
    
}

var TextMenuItem = {
    
    view: ({
        attrs: { item, selected, select }
    }) => {
        
        var children = item.children.map( child => {
            
            var attrs = { selected, select, item: child }; 
            
            return (
                <li>
                    <TextMenuItem { ...attrs }/>
                </li>
            )
            
        })
        
        return [
            <Link key={ item.id } item={ item } selected={ selected } select={ select }/>,
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
        attrs: { selected, select, root }
    }) => {
        
        return (
            <div class={ styles.root }>
                <TextMenuItem selected={ selected } select={ select } item={ root } />
            </div>
        )
        
    }
    
};