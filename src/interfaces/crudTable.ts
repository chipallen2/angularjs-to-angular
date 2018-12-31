export type IColumnType = 'select' | '';

export interface IColumnDefinitionOption {
    title: string;
    id: string;
}

export interface IColumnDefinition {
    label: string;
    valueTemplate?: string;
    type?: IColumnType;
    options?: IColumnDefinitionOption[];
    filter?: boolean; //Defaults to true. False turns off the advanced filter
}

export interface IColumnOptions {
    [key: string]: IColumnDefinition;
}

export interface ITableParamsTableConfigSorting {
    [key: string]: 'asc' | 'desc';
}

export interface ITableParamsTableConfig {
    sorting: ITableParamsTableConfigSorting;
}

export interface ITableParams {
    tableConfig: ITableParamsTableConfig;
    hasTopPage: boolean;
    useCheckboxes: boolean;
    useFilterQuery: boolean;
    tableGetDataCb: string;
    columnConfig: string | IColumnOptions;
}
