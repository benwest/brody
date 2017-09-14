var m = require('mithril');
var j2c = require('mithril-j2c');
var { baseline, margin } = require('../utils/metrics');
var { mediaQueries } = require('../utils/breakpoints');

var grey = '#9C9B9B';

var styles = j2c.attach({
    '.introduction': {
        fontSize: '2em',
        lineHeight: 1.25,
        '': mediaQueries( margin, ([ t, r, b, l ]) => 
            ({
                padding: `${ t * 2 }px ${ Math.max( r * 2, 10 ) }px ${ b * 2 }px ${ Math.max( l * 2, 10 ) }px `,
                minHeight: `calc( 50vh - ${ t }px )`
            })),
            
        ' a': {
            borderBottom: '1px solid ' + grey,
            transition: 'border-bottom-color .2s',
            '&:hover': {
                borderBottom: '1px solid white'
            }
        }
    },
    '.indent': mediaQueries( baseline, x => 
        ({ padding: `${x}px 0 0 ${x}px` }))
})

module.exports = {
    
    oninit: vnode => {
        
        vnode.state.scrollTo = vnode.state.scrollTo( vnode );
        
    },
    
    scrollTo: vnode => anchor => e => {
        
        var { height } = vnode.dom.getBoundingClientRect();
        
        scrollTo( 0, vnode.attrs.scrollAnchors[ anchor ] + height );
        
    },
    
    view: ({ attrs: { scrollAnchors }, state: { scrollTo } }) => {
        
        return (
            <div class={ styles.introduction }>
                Brody <span style={ { color: grey } }>Associates</span> is a world renowned, global creative agency.
                <div class={ styles.indent }>
                    <a onclick={ scrollTo('Typography') }>Typography</a>, <a onclick={ scrollTo('Identity') }>Identity</a>, <a onclick={ scrollTo('Digital') }>Digital</a> and <a onclick={ scrollTo('Art Direction') }>Art Direction</a>.<br/>
                    <br/>
                    <a>Contact</a><br/>
                    Social: <a href="https://twitter.com/b_associates" target="_blank">Twitter</a>, <a href="https://www.instagram.com/brody_associates" target="_blank">Instagram</a>
                </div>
            </div>
        )
        
    }
    
}