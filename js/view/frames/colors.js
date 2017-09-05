module.exports = depth => {
    
    var v = ( depth * 2 + 1 ) * 16;
    
    return `rgb(${v}, ${v}, ${v})`;
    
}