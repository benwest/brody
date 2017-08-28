var compare = ( keys, a, b ) => {
    
    return keys.some( key => a[ key ] !== b[ key ] );
    
}

module.exports = ( attrs = [], state = [] ) => ( vnode, old ) => {
    
    return compare( attrs, vnode.attrs, old.attrs ) || compare( state, vnode.state, old.state );
    
}