var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');
var wait = require('../utils/wait');
var { baseline } = require('../utils/metrics');
var breakpoints = require('../utils/breakpoints');

var styles = j2c.attach({
    '.container': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        background: 'rgba(0, 0, 0, .75)',
        '@keyframes fade-in': {
            ' from': { opacity: 0 },
            ' to': { opacity: 1 }
        },
        '@keyframes fade-out': {
            ' from': { opacity: 1 },
            ' to': { opacity: 0 }
        },
        animation: 'fade-in .5s',
        '&.exit': {
            pointerEvents: 'none',
            animation: 'fade-out .5s'
        }
    },
    '.close': {
        position: 'fixed',
        top: '1em',
        right: '1em',
        width: '3em',
        height: '3em',
        backgroundImage: 'url(/assets/img/close.svg)',
        backgroundSize: '100% 100%'
    },
    '.inner': {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: baseline( breakpoints.phone ) + 'px',
        right: baseline( breakpoints.phone ) + 'px',
        height: '2.5rem',
        borderBottom: '1px solid white',
        [ breakpoints.tablet ]: {
            left: baseline( breakpoints.tablet ) + 'px',
            right: baseline( breakpoints.tablet ) + 'px',
            height: '3.5rem',
        },
        [ breakpoints.tabletLandscape ]: {
            left: baseline( breakpoints.tabletLandscape ) * 3 + 'px',
            right: baseline( breakpoints.tabletLandscape ) * 3 + 'px',
        },
        [ breakpoints.desktop ]: {
            left: baseline( breakpoints.desktop ) * 3 + 'px',
            right: baseline( breakpoints.desktop ) * 3 + 'px',
            height: '4.5rem'
        },
        [ breakpoints.desktopLarge ]: {
            left: baseline( breakpoints.desktopLarge ) * 3 + 'px',
            right: baseline( breakpoints.desktopLarge ) * 3 + 'px',
        }
    },
    '.input, .suggestion': {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        fontSize: '2rem',
        [ breakpoints.tablet ]: {
            fontSize: '3rem'
        },
        [ breakpoints.desktop ]: {
            fontSize: '4rem'
        }
    },
    '.input': {
        color: 'white',
        margin: 0,
        padding: 0,
        border: 0,
        background: 'transparent',
        outline: 0,
        fontFamily: 'inherit',
        lineHeight: 'inherit'
    },
    '.suggestion': {
        color: 'rgba(255, 255, 255, .5)'
    },
    '.button': {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '2em',
        height: '2em',
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity .25s',
        backgroundImage: 'url(/assets/img/return.svg)',
        backgroundSize: '100% 100%',
        [ breakpoints.tablet ]: {
            height: '3rem',
            width: '3rem'
        },
        [ breakpoints.desktop ]: {
            height: '4rem',
            width: '4rem'
        },
        '&.buttonActive': {
            opacity: 1,
            pointerEvents: 'visible',
            cursor: 'pointer'
        }
    }
})

var collectProjects = ( item, projects = [] ) => {
    
    if ( item.type === 'projects' ) projects.push( item );
    
    item.children.forEach( child => collectProjects( child, projects ) );
    
    return projects;
    
}

var suggest = ( value, projects ) => {
    
    if ( value === '' ) return null;
    
    var suggestion = projects.find( project => {
        return project.title.toLowerCase().startsWith( value.toLowerCase() );
    });
    
    if ( suggestion === undefined ) return null;
    
    return {
        title: value + suggestion.title.slice( value.length ),
        url: suggestion.url
    }
    
}

module.exports = {
    
    suggestion: null,
    
    value: '',
    
    oncreate: ({ dom }) => {
        dom.querySelector('input').focus();
    },
    
    onbeforeremove: ({ dom }) => {
        dom.classList.add( styles.exit );
        return wait( 500 );
    },
    
    view: ({
        attrs: { root, close, go },
        state
    }) => {
        
        var projects = root ? collectProjects( root ) : [];
        
        var oninput = value => {
            state.value = value;
            state.suggestion = suggest( value, projects );
        }
        
        var buttonClasses = classnames({
            [ styles.button ]: true,
            [ styles.buttonActive ]: state.suggestion !== null
        })
        
        var search = () => state.suggestion && go( state.suggestion.url );
        var catchReturn = e => {
            if ( e.keyCode === 13 ) search();
        }
        
        return (
            <div class={ styles.container }>
                <div class={ styles.inner }>
                    <div class={ styles.suggestion }>{ state.suggestion && state.suggestion.title }</div>
                    <input class={ styles.input } value={ state.value } oninput={ m.withAttr( 'value', oninput ) } onkeydown={ catchReturn } spellcheck={ false }/>
                    <div class={ buttonClasses } onclick={ search }/>
                </div>
                <div class={ styles.close } onclick={ close }/>
            </div>
        )
        
    }
    
}