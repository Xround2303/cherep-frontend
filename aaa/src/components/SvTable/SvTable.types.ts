import TableStoreAbstract from "@/store/tables/TableStoreAbstract";
import { ITableStore } from "@/store/tables/TableStoreAbstract.types";


export type IProps<TRow extends object> = {
    withFilter?: boolean,
    withPaginator?: boolean,
    withFilterHistory?: boolean,
    withDragAndDrop?: boolean,
    store: TableStoreAbstract<TRow>,
    rowsPerPageOptions?: number[],
    sortMode?: "single" | "multiple" | undefined;
    height?: string,
    scrollHeight?: string | undefined
}

