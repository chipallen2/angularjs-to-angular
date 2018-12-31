import * as unist from 'unist';

import { IStringMap } from './generics';

export interface AstNode extends unist.Node {
    properties: IStringMap;
    tagName: string;
}
