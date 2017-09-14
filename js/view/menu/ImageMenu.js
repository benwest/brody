var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');
var scrollTo = require('./scrollTo');
var breakpoints = require('../utils/breakpoints');
var { BackgroundImage } = require('../modules/Image');
var { baseline } = require('../utils/metrics');

var styles = j2c.attach({
    
    '.image': {
        
        ' > *': {
            transition: 'filter 2s, transform 2s',
            filter: 'grayscale(100%) brightness(50%)',
            pointerEvents: 'none'
        },
        
        display: 'block',
        position: 'relative',
        float: 'left',
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
    
    '.active > *': {
        transition: 'filter .25s, transform .25s',
        filter: 'none',
        ' ': breakpoints.mediaQueries( baseline, x => ({ transform: `translate(${x}px, ${x}px)` }) )
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
    
    view: ({ attrs: { root, select, selected, link } }) => {
        
        if ( !root ) return;
        
        var projects = [];
        
        traverse( root, item => {
            
            if ( item.type === 'projects' ) projects.push( item );
            
        });
        
        return projects.map( ( { id, image, url }, i ) => {
            
            var imageClasses = classnames({
                [ styles.image ]: true,
                [ styles.active ]: selected === id
            })
            
            var style = {
                zIndex: projects.length - i
            }
            
            return (
                <a
                    class={ imageClasses }
                    key={ i }
                    id={ 'i' + id }
                    href={ url }
                    oncreate={ m.route.link }
                    onmouseenter={ select( id ) }
                    onmouseleave={ select( -1 ) }
                    oncreate={ link }
                    style={ style }
                >
                    <BackgroundImage file={ image }/>
                </a>
            )
            
        })
        
    }
    
}