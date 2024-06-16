import {IPrimaryValue, ITableStore, RequestGetRows, ResponseGetRows} from "@/store/tables/TableStoreAbstract.types";

export type ICrudStore<TRow, IStore = ITableStore<TRow>> = {
    requestGetRows: (context: IStore, request: RequestGetRows) => Promise<ResponseGetRows<TRow>>
    requestUpdateRow: (context: IStore, primaryValue: IPrimaryValue, data: TRow) => Promise<boolean>,
    requestDeleteRow: (context: IStore, primaryValue: IPrimaryValue) => Promise<boolean>,
    requestUpdateOrder: (context: IStore, rows: TRow[]) => Promise<boolean>,
}