var j2c = require('mithril-j2c');
var { baseline } = require('../utils/metrics')
var { responsive, mediaQueries } = require('../utils/breakpoints')
var merge = require('lodash/merge');

var mq = ( prop, lines ) => {
    return mediaQueries( [ baseline, responsive( lines ) ], ( baseline, lines ) => {
        return { [ prop ]: baseline * lines + 'px' }
    })
}

module.exports = j2c.attach({
    '.text': {
        ' p, h1, h2': merge(
            {
                padding: 0,
                marginTop: 0,
                marginBottom: 0,
                
            },
            mq( 'lineHeight', [ 1 ] )
        ),
        ' p': merge(
            mq( 'fontSize', [ 2/3 ] ),
            mq( 'lineHeight', [ 1, 1 ] ),
            {
                '&:not(:last-child)': mq( 'marginBottom', [ 2 ] )
            }
        ),
        // {
        //     fontSize: baseline( phone ) * 2/3 + 'px',
        //     lineHeight: baseline( phone ) + 'px',
        // },
        ' h1': merge(
            mq( 'fontSize', [ 2 ] ),
            mq( 'lineHeight', [ 3 ] ),
            {
                fontWeight: 'normal',
                '&:not(:last-child)': mq( 'marginBottom', [ 2 ] )
            }
        ),
        // {
        //     fontSize: baseline( phone ) * 2 + 'px',
        //     lineHeight: baseline( phone ) * 3 + 'px',
        //     '&:not(:last-child)': {
        //         marginBottom: baseline( phone ) / 2 + 'px'
        //     }
        // },
        
        ' h2': merge(
            mq( 'fontSize', [ 4 / 5 ] ),
            mq( 'lineHeight', [ 1.25 ] ),
            {
                fontWeight: 'normal',
                '&:not(:last-child)': mq( 'marginBottom', [ 2 ] )
            }
        ),
        // {
        //     fontSize: baseline( phone ) * 4 / 5 + 'px',
        //     lineHeight: baseline( phone ) + 'px',
        // }
        
        ' *:global(.text-center)': {
            textAlign: 'center'
        },
        
        ' *:global(.text-right)': {
            textAlign: 'right'
        }
        
    }
})