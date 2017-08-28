var m = require('mithril');

var { row, column } = require('./Grid.style');

var Row = {
    
    oninit: ({
        attrs: { gutter, marginBottom, marginTop, margin, flex },
        state
    }) => {
        
        if ( margin !== undefined ) {
            
            marginBottom = marginTop = margin;
            
        }
        
        state.className = row({ gutter, marginBottom, marginTop, flex });
        
    },
    
    view: ({
        state: { className },
        children
    }) => {
        
        return (
            <div class={ className }>
                { children }
            </div>
        )
        
    }
    
}

var sizes = {
    large: [ 12, 12, 12, 8 ],
    medium: [ 12, 10, 8, 6 ],
    small: [ 12, 8, 6, 4 ]
}

var offsets = {
    large: {
        left: [ 0 ],
        center: [ 0, 0, 0, 2 ],
        right: [ 0, 0, 0, 4 ]
    },
    medium: {
        left: [ 0 ],
        center: [ 0, 1, 2, 3 ],
        right: [ 0, 2, 4, 6 ]
    },
    small: {
        left: [ 0 ],
        center: [ 0, 2, 3, 4 ],
        right: [ 0, 4, 6, 8 ]
    }
};
var Column = {
    
    oninit: ({
        attrs: { offset, width, marginTop, marginBottom, margin, size, position },
        state
    }) => {
        
        if ( size !== undefined ) {
            
            width = sizes[ size ];
            offset = offsets[ size ][ position || 'left' ]
            
        }
        
        if ( margin !== undefined ) {
            
            marginBottom = marginTop = margin;
            
        }
        
        state.classname = column({ offset, width, marginBottom, marginTop })
        
    },
    
    view: ({
        state: { classname },
        children
    }) => {
        
        return (
            <div class={ classname }>
                { children }
            </div>
        )
        
    }
    
}

module.exports = { Row, Column };