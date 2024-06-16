import {ComputedRef, type Ref} from "vue";
import type {ColumnProps} from "primevue/column";

export type Filter = {
    [key: string]: string | number | boolean | any[];
}

export type ResponseGetRows<TRow> = {
    rows: TRow[],
    total: number
}

export type RequestGetRows = {
    search: string,
    filter: Filter,
    order: IOrderField[],
    page: number,
    limit: number
}

export type IOrderField = [string, "asc" | "desc"];
export type IPrimaryKey<TRow> = keyof TRow | ((item: TRow) => IPrimaryValue) | "id";
export type IPrimaryValue = number | string;

export type ITableState<TRow> = {
    primaryKey: IPrimaryKey<TRow>,
    requestParams: ComputedRef<RequestGetRows>,
    rows: Ref<TRow[]>,
    headers: Ref<ColumnProps[]>,
    headersDefault: ColumnProps[],
    filter: Ref<Filter>,
    search: Ref<string>,
    limit: Ref<number>,
    total: Ref<number>,
    order: Ref<IOrderField[]>,
    page: Ref<number>,
    isLoading: Ref<boolean>,
}

export type ITableMutators<TRow> = {
    mutatorPageNumber: ( value: number) => void,
    mutatorRows: ( value: TRow[]) => void,
    mutatorHeaders: ( value: ColumnProps[]) => void,
    mutatorRowsTotal: ( value: number) => void,
    mutatorUpdateRow: (  primaryValue: IPrimaryValue, row: TRow) => boolean,
    mutatorSortOrder: (  fields: IOrderField[]) => void,
    mutatorSearch: (  value: string) => void,
    mutatorDeleteRow: (  primaryValue: IPrimaryValue) => boolean,
}

export type ITableManager<TRow> = {
    onUpdateRows: () => Promise<void>
    onDeleteRow: ( row: TRow) => Promise<boolean>,
    onUpdateSortOrder: ( fields: [string, "asc" | "desc"][]) => Promise<boolean>,
    onUpdateRowReorder: ( rows: TRow[]) => Promise<boolean>,
    onEditRow: (row: TRow) => Promise<boolean>,
    onUpdatePageNumber: ( number: number) => Promise<boolean>,
    onExpandRow: (row: TRow) => Promise<boolean>,
    onUpdateHeaders: () => Promise<void>,
    onUpdateSearch: (text: string) => void,
    onApplyOptionHeaders: (columns: ColumnProps[]) => boolean,
    reset: () => any
}


export type ITableMethods<TRow> = ITableManager<TRow> & ITableMutators<TRow>

// Полный интерфейс таблицы
export type ITableStore<TRow> = ITableState<TRow> & ITableMethods<TRow>
