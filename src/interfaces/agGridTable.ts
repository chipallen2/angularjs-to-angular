export interface AgColumnDefinition {
    headerName: string;
    sort?: string;
    field?: string;
    type?: string | string[];
    hide?: boolean;
    // openAdvancedFilterDialog?: IOpenAdvancedFilterDialog;
    filterList?: AgColumnDefinitionFilterOption[];
    // customFilterType?: IColumnTypeFilterKeys; //Links to one of the custom filter components in src/core/components/ag-grid-table-header/view.html
    // filterQueryBuilder?: IFilterQueryBuilder;
    // multiFilter?: boolean;
    // filterIcon?: string;
    // filterComparisonType?: IComparisonType; //To override the comparison type a customer filter component uses (when the user cannot change it)
    // openModal?: (params:ICellRendererParamsExtended) => void;
    // [key: string]: any;
}

export interface AgTableOptions {
    columnDefs?: AgColumnDefinition[];
}

export interface AgColumnDefinitionFilterOption {
    name: string;
    type: string;
}
