var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');
var scrollTo = require('./scrollTo');
var breakpoints = require('../utils/breakpoints');

var styles = j2c.attach({
    
    '.image': {
        
        display: 'block',
        float: 'left',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        transition: 'filter .5s',
        width: '100%',
        paddingBottom: '100%',
        [ breakpoints.tabletLandscape ]: {
            width: '50%',
            paddingBottom: '50%',
        },
        [ breakpoints.desktopLarge ]: {
            width: '33.333%',
            paddingBottom: '33.333%',
        }
        
    },
    
    '.dimmed': {
        filter: 'grayscale( 100% )'
    }
    
})

var traverse = ( item, fn ) => {
    
    fn( item );
    
    item.children.forEach( item => traverse( item, fn ) );
    
}

module.exports = {
    
    onupdate: ({ dom, attrs: { selected } }) => {
        
        // scrollTo( dom, selected );
        
    },
    
    view: ({ attrs: { root, select, selected } }) => {
        
        var projects = [];
        
        traverse( root, item => {
            
            if ( item.type === 'project' ) projects.push( item );
            
        });
        
        return projects.map( ( { id, image, url }, i ) => {
            
            var imageClasses = classnames({
                [ styles.image ]: true,
                [ styles.dimmed ]: selected !== -1 && selected !== id
            })
            
            var style = {
                backgroundImage: `url(${ image })`
            }
            
            return (
                <a
                    class={ imageClasses }
                    style={ style }
                    key={ i }
                    id={ 'i' + id }
                    href={ url }
                    onmouseenter={ select( id ) }
                    onmouseleave={ select( -1 ) }
                />
            )
            
        })
        
    }
    
}