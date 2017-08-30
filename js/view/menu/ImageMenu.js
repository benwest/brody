var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');
var scrollTo = require('./scrollTo');
var breakpoints = require('../utils/breakpoints');
var { BackgroundImage } = require('../modules/Image');

var styles = j2c.attach({
    
    '.image': {
        
        display: 'block',
        position: 'relative',
        float: 'left',
        transition: 'filter 2s',
        filter: 'grayscale(100%) brightness(50%)',
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
    
    '.active': {
        transition: 'filter .25s',
        filter: 'none'
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
                >
                    <BackgroundImage file={ image }/>
                </a>
            )
            
        })
        
    }
    
}