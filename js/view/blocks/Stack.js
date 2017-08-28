var m = require('mithril');

var Frame = require('../frame/Frame');
var { BackgroundImage } = require('./Image');

module.exports = {
    
    oninit: ({ attrs: { files }, state }) => {
        
        
        
    },
    
    view: ({ state: { structure } }) => {
        
        return <Frames structure={ structure }/>
        
    }
    
}