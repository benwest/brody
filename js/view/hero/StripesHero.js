var m = require('mithril');
var j2c = require('mithril-j2c');
var { BackgroundImage } = require('../modules/Image');
var rAF = require('../utils/rAF');
var redraw = require('../utils/redraw');
var styles = require('./styles');
var { baseline } = require('../utils/metrics');

var localStyles = j2c.attach({
    '.stripe': {
        position: 'absolute',
        top: 0,
        left: 0,
        contain: 'strict'
    }
});

var getAxis = direction => {
    
    switch ( direction ) {
        
        case 'left':
        case 'right':
        case 'leftRightAlternating':
            return 'x';
        
        case 'up':
        case 'down':
        case 'upDownAlternating':
            return 'y';
        
    }
    
}

var totalSize = ( axis, stripeSize, gutter ) => {
    
    var ratio = axis === 'x' ? file => file.h / file.w : file => file.w / file.h;
    
    return ( total, file ) => total + gutter + ratio( file ) * stripeSize;
    
}

module.exports = {
    
    oncreate: ({ dom, state }) => {
        
        var { width, height } = dom.getBoundingClientRect();
        
        state.frame = rAF.start( redraw );
        
    },
    
    onremove: ({ state }) => {
        
        rAF.stop( state.frame );
        
    },
    
    onupdate: ({ dom, state }) => {
        
        state.rect = dom.getBoundingClientRect();
        
    },
    
    view: ({
        attrs: { url, backgroundColor, stripes, axis, overlay, gutter },
        state: { rect }
    }) => {
        
        var children = [];
        
        if ( rect ) {
            
            var now = Date.now();
            var gap = gutter ? baseline() : 0;
            var gutterTotal = gap * ( stripes.length + 1 );
            var contentSize = ( axis === 'x' ? rect.height : rect.width ) - gutterTotal;
            var stripeOffset = gap;
            
            children = stripes.map( stripe => {
                
                var s = ( stripe.size / 100 ) * contentSize;
                
                var style = {};
                
                if ( axis === 'x' ) {
                    
                    style.width = '100%'
                    style.height = s + 'px';
                    style.transform = `translateY(${ stripeOffset }px`;
                    
                } else {
                    
                    style.height = '100%'
                    style.width = s + 'px';
                    style.transform = `translateX(${ stripeOffset }px`;
                    
                }
                
                stripeOffset += s + gap;
                
                var scale = axis === 'x' ? s / stripe.file.h : s / stripe.file.w;
                var fileW = stripe.file.w * scale;
                var fileH = stripe.file.h * scale;
                
                var images = [];
                
                var t = now * .025 * ( 100 / stripe.size );
                var k = Math.floor( t / ( fileW + gap ) );
                
                var x = -( t % ( fileW + gap ) );
                var max = axis === 'x' ? rect.width : rect.height;
                
                while ( x < max ) {
                    
                    var imageStyle = {
                        width: fileW + 'px',
                        height: fileH + 'px',
                        transform: `translate${ axis.toUpperCase() }( ${ x }px )`
                    };
                    
                    k++;
                    x += gap + ( axis === 'x' ? fileW : fileH );
                    
                    if ( x > 0 ) images.push( <BackgroundImage key={ k } file={ stripe.file } style={ imageStyle }/> );
                    
                }
                
                return <div class={ localStyles.stripe } style={ style }>{ images }</div>;
                
            })
            
            if ( overlay ) {
                
                children.push( <BackgroundImage file={ overlay } fit='contain'/> )
                
            }
            
        }
        
        if ( url ) {
            return (
                <a href={ url } oncreate={ m.route.link } class={ styles.background } style={ { background: backgroundColor } }>
                    { children }
                </a>
            )
        } else {
            return (
                <div class={ styles.background } style={ { background: backgroundColor } }>
                    { children }
                </div>
            )
        }
        
    }
    
}