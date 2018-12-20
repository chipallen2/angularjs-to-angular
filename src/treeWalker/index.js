/**
 * Makes getting things from the AST as easy as using JSON syntax
 *
 * Call it like this:
 * const {TreeWalker } = require('TreeWalker')
 * const ts = require('typescript');
 * const kind = ts.SyntaxKind;
 *
 * const walker = new TreeWalker(ast)
 *
 * walker.get(`${kind.FunctionExpression}.body.${kind.}
 */
class TreeWalker {

    constructor(tree) {
        this.tree = tree;
    }

    get(pattern) {

    }

}

module.exports = { TreeWalker };
