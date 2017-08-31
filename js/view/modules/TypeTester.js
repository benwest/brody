var m = require('mithril');
var j2c = require('mithril-j2c');
var classnames = require('classnames');
var Static = require('../utils/Static');
var { Row, Column } = require('../grid/Grid');
var arrange = require('../grid/arrange');
var { textWidths } = require('../utils/metrics');
var { text } = require('../utils/typography');
var fonts = require('../utils/fonts');
var { mediaQueries } = require('../utils/breakpoints');
var { baseline } = require('../utils/metrics');

var styles = j2c.attach({
    '.label': mediaQueries( baseline, x => ({ marginBottom: x + 'px' }) ),
    '.family': {
        fontWeight: 'bold',
        textDecoration: 'underline'
    },
    '.input': {
        padding: 0,
        margin: 0,
        background: 'transparent',
        border: 'none',
        outline: 0,
        width: '100%',
        display: 'block',
        '&::placeholder': {
            color: 'inherit'
        }
    },
    '.left': {
        textAlign: 'left'
    },
    '.center': {
        textAlign: 'center'
    },
    '.right': {
        textAlign: 'right'
    },
    '.nowrap': {
        whiteSpace: 'nowrap',
        position: 'relative',
        '&.right': {
            width: '40000%',
            left: '-39900%'
        }
    }
})

//https://github.com/MithrilJS/mithril.js/issues/1929

var Input = {
    
    oncreate: ({ dom, attrs: { placeholder }}) => {
        
        dom.textContent = placeholder;
        
    },
    
    view: ({ attrs, state }) => {
        
        return (
            <span
                class={ attrs.class }
                style={ attrs.style }
                contenteditable
                spellcheck="false"
            />
        )
        
    }
    
}

module.exports = {
    
    oninit: ({ state, attrs: { width, position, placeholder } }) => {
        
        state.columns = arrange( [ 0 ], textWidths[ width ], position );
        
        state.value = placeholder;
        
    },
    
    view: ({
        attrs: { font, fontName, weight, size, placeholder, align, wrapping, color },
        state
    }) => {
        
        var columns = state.columns.map( ([ widths, offsets ], i ) => {
            
            var labelClasses = classnames([ styles.label, styles[ align ], text ])
            
            var inputClasses = classnames({
                [ styles.input ]: true,
                [ fonts( font ) ]: true,
                [ styles[ align ] ]: true,
                [ styles.nowrap ]: !wrapping
            })
            
            var lineHeight = baseline() * size;
            
            var inputStyle = {
                color,
                fontSize: lineHeight * 2/3 + 'px',
                lineHeight: lineHeight + 'px'
            }
            
            return (
                <Column key={ i } width={ widths } offset={ offsets } marginBottom={[ 4, 2 ]}>
                
                    <div class={ labelClasses }>
                        <span class={ styles.family }>{ fontName }</span> { weight }
                    </div>
                    
                    <Input
                        class={ inputClasses }
                        style={ inputStyle }
                        placeholder={ placeholder }
                    />
                    
                </Column>
            )
        })
        
        return (
            //<Static>
                <Row gutter={ [ 1, 1, 2 ] }>
                    { columns }
                </Row>
            //</Static>
        )
        
    }
    
}