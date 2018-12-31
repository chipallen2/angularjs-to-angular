import * as ts from 'typescript';

import { IColumnDefinition, IColumnOption } from '../interfaces/crudTable';
import {AgTableOptions} from "../interfaces/agGridTable";

export class TableOptionsAdapter {

    public static convert(crudTableOptions: ts.ObjectLiteralExpression): AgTableOptions {
        const options: AgTableOptions = {
            columnDefs:
        };

        if (columnDefinition.options) {
            colDef.filterList = columnDefinition.options.map((option: IColumnOption) => ColumnDefinitionAdapter.convertOption(option));
        }

        return colDef;
    }

}
