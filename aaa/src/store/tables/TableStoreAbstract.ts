import { ComputedRef, Ref, computed, ref } from "vue";

import {
    Filter,
    IOrderField,
    IPrimaryKey,
    IPrimaryValue,
    ITableStore,
    RequestGetRows,
} from "./TableStoreAbstract.types";
import { ColumnProps } from "primevue/column";
import {cloneDeep} from "lodash";
import {ICrudStore} from "@/store/tables/CrudAbstract.types";


export default class <TRow extends object> implements ITableStore<TRow> {

    storeId: string;
    primaryKey: IPrimaryKey<TRow>;
    isLoading: Ref<boolean>;
    filter: Ref<Filter>;
    search: Ref<string>;
    rows: Ref<TRow[]>;
    total: Ref<number>;
    page: Ref<number>;
    limit: Ref<number>;
    order: Ref<IOrderField[]>;
    requestParams: ComputedRef<RequestGetRows>;
    headersDefault: ColumnProps[];
    headers: Ref<ColumnProps[]>;
    crud: ICrudStore<TRow>;

    constructor(storeId: string, headersDefault: ColumnProps[], crud: ICrudStore<TRow>) {
        this.storeId = storeId;
        this.primaryKey = "id";
        this.isLoading = ref(false);
        this.filter = ref({});
        this.search = ref("");
        this.rows = ref([]);
        this.total = ref(0);
        this.page = ref(1);
        this.limit = ref(10);
        this.order = ref([]);
        this.headersDefault = headersDefault;
        this.headers = ref([]);
        this.crud = crud;

        this.requestParams = computed<RequestGetRows>(() =>  ({
            search: this.search.value,
            filter: this.filter.value,
            order: this.order.value,
            page: this.page.value,
            limit: this.limit.value
        }));
    }

    getPrimaryKey(row: TRow): IPrimaryValue {
        return typeof this.primaryKey === "function"
            ? this.primaryKey(row)
            : row[this.primaryKey as keyof TRow] as IPrimaryValue;
    }

    findRowByPrimaryKey(primaryValue: string | number): TRow | false {
        const row = this.rows.value.find(row => this.getPrimaryKey(row) === primaryValue);
        return row ? row : false;
    }

    mutatorDeleteRow(primaryValue: string | number) {
        const row = this.findRowByPrimaryKey(primaryValue);
        if (!row) return false;

        this.rows.value.splice(this.rows.value.indexOf(row), 1);

        return true;
    }

    mutatorRows(value: TRow[]) {
        this.rows.value = value;
    }

    mutatorHeaders(value: ColumnProps[]) {
        this.headers.value = value;
    }

    mutatorRowsTotal(value: number) {
        this.total.value = value;
    }

    mutatorUpdateRow(primaryValue: IPrimaryValue, data: TRow) {
        const row = this.findRowByPrimaryKey(primaryValue);
        if (!row) return false;

        Object.keys(data).forEach(key => {
            row[key as keyof TRow] = data[key as keyof TRow];
        });

        return true;

    }

    mutatorPageNumber(value: number) {
        this.page.value = value;
    }

    mutatorSortOrder(fields: IOrderField[]) {
        this.order.value = fields;
    }

    mutatorSearch(value: string) {
        this.search.value = value;
    }
    async onUpdateRows() {
        this.isLoading.value = true;
        this.crud.requestGetRows(this, this.requestParams.value).then(e => {
            this.mutatorRows(e.rows);
            this.mutatorRowsTotal(e.total);
            this.isLoading.value = false;
        });
    }

    async onExpandRow(row: TRow) {
        // Событие, если расширили строку
        return true;
    }

    async onDeleteRow(row: TRow) {
        await this.crud.requestDeleteRow(this, this.getPrimaryKey(row));
        return this.mutatorDeleteRow(this.getPrimaryKey(row));
    }

    async onUpdateSortOrder(fields: IOrderField[]) {
        this.mutatorSortOrder(fields);
        return true;
    }

    onUpdateRowReorder(rows: TRow[]): Promise<boolean> {
        this.mutatorRows(rows);
        return this.crud.requestUpdateOrder(this, rows);
    }

    async onEditRow(row: TRow) {
        await this.crud.requestUpdateRow(this, this.getPrimaryKey(row), row);
        return this.mutatorUpdateRow(this.getPrimaryKey(row), row);
    }

    async onUpdateHeaders() {
        let columns = [];

        const data = localStorage.getItem(this.storeId);
        const storage = (data ? JSON.parse(data) : []) as ColumnProps[];

        columns = Array.isArray(storage)
            ? cloneDeep(this.headersDefault).map(item => {
                const header = storage.find(storageItem => item.field === storageItem.field);

                item.hidden = header
                    ? header.hidden
                    : item.hidden;

                return item;
            })
            : cloneDeep(this.headersDefault);

        columns.sort((item1, item2) => {
            return storage.findIndex((element) =>
                element.field === item1.field) - storage.findIndex(
                    (element) => element.field === item2.field
                );
        });

        this.mutatorHeaders(columns);
    }

    onUpdateSearch(value: string) {
        this.mutatorSearch(value);
    }

    async onUpdatePageNumber(value: number) {
        this.mutatorPageNumber(value);
        return true;
    }

    onApplyOptionHeaders(columns: ColumnProps[]) {
        localStorage.setItem(this.storeId, JSON.stringify(columns));
        this.mutatorHeaders(columns);
        return true;
    }

    reset() {
        this.rows.value = [];
        this.isLoading.value = false;
        this.filter.value = {};
        this.search.value = "";
        this.total.value = 0;
        this.page.value = 0;
        this.limit.value = 10;
        this.order.value = [];
    }
}
