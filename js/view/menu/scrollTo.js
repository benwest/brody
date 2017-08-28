var animateScroll = require('../utils/animateScroll');

module.exports = ( dom, selected ) => {
    
    if ( selected === -1 ) return;
    
    var container = dom.parentNode;
    
    var element = container.querySelector( '#i' + selected );
    
    if ( !element ) return;
    
    var top = element.offsetTop;
    var h = element.clientHeight;
    var st = container.scrollTop;
    var offset = top - st;
    
    if ( top - st < 0 ) {
        
        return animateScroll({ element: container, to: top });
        
    } else if ( offset + h > window.innerHeight ) {
        
        return animateScroll({ element: container, to: top })
        
    }
    
}