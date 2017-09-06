module.exports = ( out, [ srcW, srcH ], [ destW, destH ], fit = 'cover' ) => {
    var fn = fit === 'contain' ? Math.min : Math.max;
    var scale = fn( destW / srcW, destH / srcH );
    out[ 0 ] = srcW * scale;
    out[ 1 ] = srcH * scale;
    return out;
}