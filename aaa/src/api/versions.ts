import {TRow} from "@/store/versions/Table.types";
import useEnvStore from "@/store/env";
import CrudAbstract from "@/store/tables/CrudAbstract";
import {ITableStore, RequestGetRows, ResponseGetRows} from "@/store/tables/TableStoreAbstract.types";

export default new class extends CrudAbstract<TRow>{
    async requestGetRows(context: ITableStore<TRow>, request: RequestGetRows): Promise<ResponseGetRows<TRow>>{
        const envStore = useEnvStore();
        return new Promise(resolve => {
            resolve({
                rows: envStore.getVersions,
                total: 0
            });
        });
    }
};
