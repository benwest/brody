module.exports = src => new Promise( resolve => {
    
    /* global Image */
    
    var img = new Image();
    
    img.crossOrigin = '';
    
    img.onload = () => resolve( img );
    
    img.src = src;
    
})