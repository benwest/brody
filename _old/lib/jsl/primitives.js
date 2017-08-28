var primitive = type => value => ({ type, value, length: 1 });

module.exports = {
    float: primitive('float'),
    int: primitive('int'),
    bool: primitive('bool')
};