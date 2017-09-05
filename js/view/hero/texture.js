// var loadImage = require('../utils/loadImage');
// var chooseImage = require('../utils/chooseImage');

// var img = src => {
//     /* global Image */
//     var i = new Image();
//     i.src = src;
//     return i;
// }

// module.exports = ( context, file ) => {
    
//     var curr = -1;
//     var texture;
    
//     return size => {
        
//         var srcIndex = chooseImage( file, size );
        
//         if ( srcIndex !== curr )  {
            
//             var url = file.srcs[ srcIndex ].url;
            
//             if ( !texture ) {
                
//                 texture = context.texture( img( url ) );
                
//             } else {
                
//                 texture( img( url ) );
                
//             }
            
//             curr = srcIndex;
            
//         }
        
//         return texture;
        
//     }
    
// }

module.exports = ( context, file ) => {
    
    var img = new Image();
    
    img.src = file.srcs[ file.srcs.length - 1 ].url;
    
    var texture = context.texture( img );
    
    return size => texture;
    
}