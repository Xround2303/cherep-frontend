import {
    IPrimaryValue,
    ITableStore,
    RequestGetRows,
    ResponseGetRows
} from "@/store/tables/TableStoreAbstract.types";
import {ICrudStore} from "./CrudAbstract.types";
export default class <TRow extends object, IStore = ITableStore<TRow>> implements ICrudStore<TRow, IStore>{
    async requestGetRows(context: IStore, request: RequestGetRows): Promise<ResponseGetRows<TRow>> {
        return {
            rows: [],
            total: 0
        };
    }
    async requestDeleteRow(context: IStore, primaryValue: IPrimaryValue) {
        return true;
    }
    async requestUpdateOrder(context: IStore, rows: TRow[]) {
        return true;
    }
    async requestUpdateRow(context: IStore, primaryValue: IPrimaryValue, data: TRow) {
        return true;
    }
}