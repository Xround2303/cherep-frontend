import type {ColumnProps} from "primevue/column";
import {IPrimaryKey} from "@/store/tables/TableStoreAbstract.types";

export type IProps = {
    headers: ColumnProps[],
    rows: any[],
    withDragAndDrop?: boolean,
    primaryKey?: IPrimaryKey<any>,
    sortMode?: "single" | "multiple" | undefined;
    loading?: boolean
}

export type ISlotOnDeleteRow<TRow> = (data: TRow) => void
export type ISlotOnEditSave<TRow> = (data: TRow) => void
export type ISlotOnEditCancel<TRow> = (data: TRow) => void
export type ISlotToEdit<TRow> = (data: TRow) => void
export type ISlotBodyProps<T> = {
    data: T
}


type GetKeysPrefix<T extends object, P extends string> = {
    [K in keyof T as `${P & string}${K & string}`]: K
}

export type IEditorItem<TRow extends object> = keyof GetKeysPrefix<TRow, "editor.item.">;
export type IItem<TRow extends object> = keyof GetKeysPrefix<TRow, "item.">;
export type dynamicKeys<TRow extends object> = IEditorItem<TRow> | IItem<TRow>;

type ISlotsDynamicKeys<T extends object> = {
    [key in dynamicKeys<T>]: (props: { body: ISlotBodyProps<T> }) => any
}

type ISlotStaticKeys<TRow> = {
    actions: (props: {
        body: ISlotBodyProps<TRow>,
        onDeleteRow: ISlotOnDeleteRow<TRow>,
        onEditSave: ISlotOnEditSave<TRow>,
        onEditCancel: ISlotOnEditCancel<TRow>,
        editingRows: TRow[],
        toEdit: ISlotToEdit<TRow>,
    }) => any,
    expansion: (props: {
        body: ISlotBodyProps<TRow>
    }) => any,
}

export type ISlots<T extends object> = ISlotsDynamicKeys<T> & ISlotStaticKeys<T>