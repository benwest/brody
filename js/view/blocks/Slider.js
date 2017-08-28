var m = require('mithril');

var Frame = require('../frame/Frame');
var { BackgroundImage } = require('./Image');

module.exports = {
    
    view: ({ attrs: { files } }) => {
        
        return '';
        
        var structure = {
            title: '',
            children: files.map( file => {
                return {
                    title: '',
                    content: <BackgroundImage file={ file } size={'cover'}/>
                }
            })
        }
        
        return <Frame structure={ structure }/>
        
    }
    
}