const getMethods = require('../get-methods');
const getWhen = require('../get-when');

module.exports.get = function (ast) {
    const theClass = getWhen(ast);
    const methods = getMethods.all(theClass);
    
    const results = methods.map(m => {
        return ast.text.slice(m.pos, m.end);
    });

    return results.join('');
};