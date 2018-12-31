// import { AgConfigInterface, IAdvancedFilterDialogFilterItem } from '@ghx/ui-core';
//
// import { IColumnDefinition, IColumnOption } from '../interfaces/crudTable';
//
// export class ColumnDefinitionAdapter {
//
//     public static convert(field: string, columnDefinition: IColumnDefinition): AgConfigInterface {
//         const colDef: AgConfigInterface = {
//             field,
//             headerName: columnDefinition.label,
//         };
//
//         if (columnDefinition.options) {
//             colDef.filterList = columnDefinition.options.map((option: IColumnOption) => ColumnDefinitionAdapter.convertOption(option));
//         }
//
//         return colDef;
//     }
//
//     public static convertOption(option: IColumnOption): IAdvancedFilterDialogFilterItem {
//         return {
//             name: option.title,
//             type: option.id,
//         };
//     }
//
// }
