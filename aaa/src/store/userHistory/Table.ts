import {TRow, ITableStoreUserHistory} from "./Table.types";
import {ColumnProps} from "primevue/column";
import repository from "../../api/usersHistory";
import {ICrudStore} from "../tables/CrudAbstract.types";
import {Ref, ref} from "vue";
import TableStoreAbstract from "@/store/tables/TableStoreAbstract";

const headersDefault = [
    {
        field: "date",
        header: "Дата",
        sortable: true,
    },
    {
        field: "user_name",
        header: "Пользователь",
        sortable: true,
    },
    {
        field: "action",
        header: "Действие",
        sortable: true,
    },
];
const expandedHeaders = [
    {
        field: "field",
        header: "Поле",
        sortable: true,
    },
    {
        field: "previous_value",
        header: "Предыдущее значение",
        sortable: true,
    },
    {
        field: "new_value",
        header: "Новое значение",
        sortable: true,
    },
];

class TableStoreUserHistory extends TableStoreAbstract<TRow> implements ITableStoreUserHistory{
    itemId: Ref<number | null>;
    expandedHeaders: ColumnProps[];

    constructor(storeId: string, headersDefault: ColumnProps[], expandedHeaders: ColumnProps[], crud: ICrudStore<TRow>) {
        super(storeId, headersDefault, crud);

        this.itemId = ref(null);
        this.expandedHeaders = expandedHeaders;
    }

    mutatorItemId(value: number) {
        this.itemId.value = value;
    }
}

export default new TableStoreUserHistory(
    "user_history",
    headersDefault,
    expandedHeaders,
    repository as ICrudStore<TRow>
);
