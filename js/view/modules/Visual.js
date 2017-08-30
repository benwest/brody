var m = require("mithril");

var { Image, BackgroundImage } = require('./Image');
var Video = require('./Video');

module.exports = {
    
    view: ({ attrs: { file, fit } }) => {
        
        switch ( file.type ) {
            
            case 'image':
                
                if ( fit ) {
                    
                    return <BackgroundImage file={ file } fit={ fit }/>
                    
                } else {
                    
                    return <Image file={ file }/>
                    
                }
                
            case 'video':
                
                return <Video file={ file } fit={ fit }/>
            
        }
        
    }
    
}