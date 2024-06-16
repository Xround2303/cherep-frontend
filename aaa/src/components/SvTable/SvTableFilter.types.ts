import TableStoreAbstract from "@/store/tables/TableStoreAbstract";

export type ISlots = {
    "after-search": () => any,
    "before-search": () => any,
}

export type IProps<TRow extends object> = {
    withFilterHistory?:boolean,
    store: TableStoreAbstract<TRow>,
}