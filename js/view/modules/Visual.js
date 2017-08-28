var m = require("mithril");

var { Image } = require('./Image');
var Video = require('./Video');

module.exports = {
    
    view: ({ attrs: { file } }) => {
        
        switch ( file.type ) {
            
            case 'image':
                return <Image file={ file }/>
                
            case 'video':
                return <Video file={ file }/>
            
        }
        
    }
    
}