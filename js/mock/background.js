var { cartesianProduct } = require('js-combinatorics');

var text = {
    
    type: 'text',
    
    attrs: {
        
        content: '<h1>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33</h1>',
        
        size: 'medium',
        
        position: 'center'
        
    }
    
}

var image = {
    
    type: 'visuals',
    
    attrs: {
        
        size: 'medium',
    
        position: 'center',
    
        gutter: true,
        
        files: [{
            "type": "image",
            "srcs": [{
                "w": 1200,
                "h": 800,
                "url": "/assets/img/Channel4.Web2_.jpg"
            }]
        }]
    
    }
    
}

module.exports = [{
    
    type: 'background',
    
    attrs: {
        
        color: '#00f',
        
        fixed: false
        
    }
    
},
text,
{
    
    type: 'background',
    
    attrs: {
        
        color: '#000',
        
        file: {
            type: 'image',
            srcs: [{
                url: '/assets/img/BA.Web.TestStories.RCA.Image.7.jpg',
                w: 803,
                h: 1200
            },{
                url: '/assets/img/BA.Web.TestStories.RCA.Image.7.jpg',
                w: 1600,
                h: 2390
            }]
        },
        
        fixed: false
        
    }
    
},
text,
{
    type: 'background',
    
    attrs: {
        
        color: '#000',
        
        file: {
            type: 'image',
            srcs: [{
                url: '/assets/img/BA.Web.TestStories.RCA.Image.7.jpg',
                w: 803,
                h: 1200
            },{
                url: '/assets/img/BA.Web.TestStories.RCA.Image.7.jpg',
                w: 1600,
                h: 2390
            }]
        },
        
        fixed: true
        
    }
},
text,
{
    type: 'background',
    
    attrs: {
        
        color: '#000',
        
        file: {
            type: 'video',
            url: '/assets/img/IMG_5086.MOV.mov'
        },
        
        fixed: true
        
    }
},
image
]