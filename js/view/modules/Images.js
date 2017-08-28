var m = require('mithril');
var classnames = require('classnames');

var { Row, Column } = require('../grid/Grid')
var spacing = require('../utils/spacing');
var { Image } = require('./Image');

var gutters = [
    0,
    1,
    [ 1, 2 ]
]

var widths = [
    12,
    [ 12, 6 ],
    [ 12, 4 ]
]

module.exports = {
    
    view: ({
        attrs: { files, size, position, gutter }
    }) => {
        
        var columns = files.map( file => {
            
            return (
                <Column width={ widths[ files.length - 1 ] }>
                    <Image file={ file }/>
                </Column>
            )
            
        })
        
        return (
            <Row>
                <Column size={ size } position={ position } margin={ 2 }>
                    <Row gutter={ gutters[ gutter ] }>
                        { columns }
                    </Row>
                </Column>
            </Row>
        );
        
    }
    
}