var animateScroll = require('../utils/animateScroll');

module.exports = ( dom, selected ) => {
    
    if ( selected === -1 ) return;
    
    var element = dom.querySelector( '#i' + selected );
    
    if ( !element ) return;
    
    var top = element.offsetTop;
    var h = element.clientHeight;
    var st = dom.scrollTop;
    var offset = top - st;
    
    if ( top - st < 0 ) {
        
        return animateScroll({ element: dom, to: top });
        
    } else if ( offset + h > window.innerHeight ) {
        
        return animateScroll({ element: dom, to: top })
        
    }
    
    return Promise.resolve();
    
}