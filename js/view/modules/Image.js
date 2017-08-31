var m = require('mithril');
var j2c = require('mithril-j2c');
var lazyRect = require('../utils/lazyRect');
var visible = require('../utils/visible');
var wait = require('../utils/wait');
var redraw = require('../utils/redraw');

var chooseImage = require('../utils/chooseImage');

var styles = j2c.attach({
    
    '.container': {
        width: '100%',
        position: 'relative'
    },
    
    '.bgContainer': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    
    '.img': {
        
        '@keyframes fade-in': {
            ' from': { opacity: 0 },
            ' to': { opacity: 1 }
        },
        
        '@keyframes fade-out': {
            ' from': { opacity: 1 },
            ' to': { opacity: 0 }
        },
        
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        animation: 'fade-in 0.5s',
        
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // zIndex: 1,
        
        '.exit': {
            zIndex: 0
        }
    }
    
})

var Src = {
    
    onbeforeremove: ({ dom }) => {

        dom.classList.add( styles.exit );
        
        return wait( 500 );

    }
    
}

var ImgSrc = Object.assign({
    
    view: ({ attrs: { file, index } }) => {
        return <img class={ styles.img } src={ file.srcs[ index ].url }/>
    }
    
}, Src );

var BgSrc = Object.assign({
    
    view: ({ attrs: { file, index, fixed, fit = 'cover' } }) => {
        
        if ( file.srcs[ index ].w === 1 ) index++;
        
        var style = {
            backgroundImage: `url(${ file.srcs[ index ].url })`,
            backgroundSize: fit,
            backgroundAttachment: fixed ? 'fixed' : 'scroll'
        }
        
        return <div class={ styles.img } style={ style }/>
        
    }
    
}, Src );

var BgContainer = {
    
    view: ({ children }) => {
        
        return <div class={ styles.bgContainer }>{ children }</div>
        
    }
    
}

var ImgContainer = {
    
    view: ({ children, attrs: { ratio } }) => {
        
        var style = {
            paddingBottom: ratio * 100 + '%'
        }
        
        return (
            <div class={ styles.container } style={ style }>
                { children }
            </div>
        )
        
    }
    
}

var Image = ( Src, Container ) => ({
    
    srcIndex: 0,
    
    rect: undefined,
    
    oninit: ({ attrs: { file }, state }) => {
        
        state.ratio = file.h / file.w;
        
    },
    
    oncreate: ({ state, dom }) => {
        
        state.rect = lazyRect.subscribe( dom );
        
    },
    
    onbeforeupdate: ({ attrs: { file }, state }) => {
        
        var rect = lazyRect.get( state.rect );
        
        if ( !visible( rect ) ) return;
        
        state.srcIndex = chooseImage( file, rect );
        
    },
    
    onbeforeremove: ({ state: { rect } }) => {
        
        lazyRect.unsubscribe( rect );
        
    },
    
    view: ({
        attrs,
        state: { srcIndex, ratio }
    }) => {
        
        var child = <Src file={ attrs.file } index={ srcIndex } key={ srcIndex } { ...attrs }/>;
        
        return (
            <Container ratio={ ratio }>
                { [ child, '' ] }
            </Container>
        )
        
    }
    
})

module.exports = {
    
    Image: Image( ImgSrc, ImgContainer ),
    
    BackgroundImage: Image( BgSrc, BgContainer )
    
}