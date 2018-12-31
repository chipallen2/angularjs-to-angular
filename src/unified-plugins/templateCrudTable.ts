/* tslint:disable:only-arrow-functions */

import { AgTableOptions } from '../interfaces/agGridTable';
import { AstNode } from '../interfaces/unified';
import { Controller } from '../types/controller';
import { UnifiedTemplateUtil } from '../utils/unifiedTemplateUtil';

export default function attacher(): any {
    return (tree: any, file: any): any => {
        file.data.hasCrudTable = false;
        const crudTable: AstNode | null = UnifiedTemplateUtil.getCrudTable(tree);
        if (!crudTable) return;

        file.data.hasCrudTable = true;
        file.data.crudTableParamVariable = crudTable.properties.params.replace('::', '');

        const controller: Controller = file.data.controller;
        const agTableOptions: AgTableOptions | undefined = controller.convertCrudTableParams(file.data.crudTableParamVariable);
        file.data.agTableOptions = agTableOptions;
    };
}
