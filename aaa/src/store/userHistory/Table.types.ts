import {ITableStore} from "@/store/tables/TableStoreAbstract.types";
import {Ref} from "vue";

export type TRowExpanded = {
    field: string,
    previous_value: string,
    new_value: string
}

export type TRow = {
    id: number,
    date: string,
    user_name: string,
    action: string,
    expanded?: TRowExpanded[]
}

export interface ITableStoreUserHistory extends ITableStore<TRow>{
    itemId: Ref<number | null>,
    mutatorItemId: (value: number) => any
}