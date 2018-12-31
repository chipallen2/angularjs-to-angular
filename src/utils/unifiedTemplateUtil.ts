import * as unist from 'unist';
import * as find from 'unist-util-find';

import {AstNode} from "../interfaces/unified";

export class UnifiedTemplateUtil {

    public static getCrudTable(tree: unist.Node): AstNode | null {
        return find(tree, { tagName: 'crud-table' });
    }

}
