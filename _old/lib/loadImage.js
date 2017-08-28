module.exports = src => new Promise( resolve => {
    
    /* global Image */
    
    var img = new Image();
    
    img.onload = () => resolve( img );
    
    img.crossOrigin = '';
    
    img.src = src;
    
});