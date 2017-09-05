var axios = require('axios');

module.exports = url => {
    
    return axios.get( process.env.API_BASE + url )
        .then( r => r.data )
    
}

// module.exports = url => new Promise( ( resolve, reject ) => {
    
//     if ( window.__apiPreload[ url ] ) return resolve( window.__apiPreload[ url ] );
    
//     var request = new window.XMLHttpRequest();
    
//     request.open( 'GET', process.env.API_BASE + url, true );
    
//     request.onload = () => {
        
//         if (request.status >= 200 && request.status < 400) {
            
//             var response = JSON.parse( request.responseText );
            
//             window.__apiPreload[ url ] = response;
            
//             // console.log( 'got', url );
            
//             resolve( response );
            
//         } else {
        
//             reject();
        
//         }
        
//     };
    
//     request.onerror = () => {
        
//         reject();
        
//     };
    
//     request.send();

// });