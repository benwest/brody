var m = require('mithril');
var j2c = require('mithril-j2c');
var { phone, tablet, tabletLandscape, desktop, desktopLarge } = require('../utils/breakpoints');
var { baseline } = require('../utils/metrics');

var SIZE = 40;

var styles = j2c.attach({
    
    '.menuButton': {
        
        position: 'fixed',
        width: SIZE + 'px',
        height: SIZE + 'px',
        backgroundImage: 'url(/assets/img/brody.svg)',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer',
        zIndex: 600,
        transform: 'translate(-50%, 50%)',
        left: '50%',
        bottom: baseline( phone ) * 2 + 'px',
        
        [ tablet ]: {
            bottom: baseline( tablet ) * 1.5 + 'px',
        },
        
        [ tabletLandscape ]: {
            bottom: 'auto',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            left: baseline( tabletLandscape ) + 'px',
        },
        
        [ desktop ]: {
            left: baseline( desktop ) + 'px',
        },
        
        [ desktopLarge ]: {
            left: baseline( desktopLarge ) + 'px',
        }
        
    }
    
})

module.exports = {
    
    view: ({ attrs: { onclick } }) => {
        
        return <div class={ styles.menuButton } onclick={ onclick } />
        
    }
    
}