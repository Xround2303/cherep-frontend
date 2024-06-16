import {TRow} from "@/store/users/Table.types";
import CrudAbstract from "@/store/tables/CrudAbstract";
import {IPrimaryValue, ITableStore, RequestGetRows, ResponseGetRows} from "@/store/tables/TableStoreAbstract.types";
import {useContextManager} from "@/plugins/contextManager";


export default new class extends CrudAbstract<TRow>{
    async requestGetRows(context: ITableStore<TRow>, request: RequestGetRows): Promise<ResponseGetRows<TRow>>{

        const data = await useContextManager().axiosWithoutAuth().get("/users");

        return {
            rows: data.data.users,
            total: data.data.total
        };
    }
    async requestDeleteRow(context: ITableStore<TRow>, primaryValue: IPrimaryValue) {
        return true;
    }
    async requestUpdateOrder(context: ITableStore<TRow>, rows: TRow[]) {
        return true;
    }
    async requestUpdateRow(context: ITableStore<TRow>, primaryValue: IPrimaryValue, data: TRow) {
        return true;
    }
};
