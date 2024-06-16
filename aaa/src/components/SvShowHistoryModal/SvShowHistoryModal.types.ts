import {ITableStore} from "@/store/tables/TableStoreAbstract.types";
import {TRow} from "@/store/userHistory/Table.types";

export type IProps = {
    store: ITableStore<TRow>
}