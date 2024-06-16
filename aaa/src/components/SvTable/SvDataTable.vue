<template>
  <SvDataTablePrime
    v-model:expandedRows="expandedRows"
    :value="rows"
    :reorderable-columns="false"
    :editing-rows="editingRows"
    edit-mode="row"
    :data-key="primaryKey"
    :size="'small'"
    :pt="pt"
    :sort-mode="sortMode"
    :loading="loading"
    @row-expand="emits('expand:row', $event.data)"
    @row-reorder="onRowReorder($event.value)"
    @sort="onChangeOrder($event)"
  >
    <PrimeColumn
      v-if="withDragAndDrop"
      row-reorder
      :reorderable-column="false"
      style="width: 50px"
    />

    <!-- Колонки -->
    <PrimeColumn
      v-for="header of headers"
      v-bind="header"
      :key="header.field"
      :pt="ptHeader"
      style="width: auto"
    >
      <template
        v-if="existingSlots.includes(`item.` + header.field)"
        #body="body"
      >
        <slot
          :name="`item.` + header.field"
          :body="body"
        />
      </template>
      <template
        v-if="existingSlots.includes(`editor.item.` + header.field)"
        #editor="body"
      >
        <slot
          :name="`editor.item.` + header.field"
          :body="body"
        />
      </template>
    </PrimeColumn>

    <!-- Экшен кнопки -->
    <PrimeColumn
      v-if="isExistActionBtn"
      header-style="width: 5rem; text-align: center"
      body-style="text-align: center; overflow: visible"
    >
      <template #body="body">
        <div class="flex justify-content-end">
          <slot
            :name="'actions'"
            :body="body"
            :on-delete-row="() => onDeleteRow(body.data)"
            :to-edit="toEdit"
            :on-edit-save="onEditSave"
            :on-edit-cancel="onEditCancel"
            :editing-rows="editingRows"
          />
        </div>
      </template>
    </PrimeColumn>

    <!-- Расширение строки таблицы-->
    <PrimeColumn
      v-if="$slots.expansion"
      expander
      :style="{width: '60px'}"
    />
    <template
      v-if="$slots.expansion"
      #expansion="slotProps"
    >
      <div class="p-3">
        <slot
          name="expansion"
          :body="slotProps"
        />
      </div>
    </template>
  </SvDataTablePrime>
</template>

<script setup lang="ts" generic="TRow extends object">
import SvDataTablePrime, {type DataTableSortEvent} from "primevue/datatable";
import PrimeColumn from "primevue/column";
import {computed, ref, useSlots} from "vue";
import {IProps, ISlots} from "./SvDataTable.types";

defineSlots<ISlots<TRow>>();
const props = withDefaults(defineProps<IProps>(), {
  primaryKey: "id",
  withDragAndDrop: false,
  headers: () => [],
  rows: () => [],
  sortMode: "single",
  loading: false
});

const emits = defineEmits([
  "edit:row",
  "delete:row",
  "sort:rows",
  "reorder:rows",
  "expand:row"
]);

const slots = useSlots();
const isExistActionBtn = computed(() => slots.actions);
const existingSlots = computed(() => Object.keys(slots));
const expandedRows = ref();
const editingRows = ref([]);

const toEdit = (e: TRow) => {
  editingRows.value = [e];
};
const closeRowEdit = () => {
  editingRows.value = [];
};
const onEditSave = (row: TRow) => {
  emits("edit:row", row);
  closeRowEdit();
};

const onDeleteRow = (row: TRow) => {
  emits("delete:row", row);
};
const onEditCancel = () => editingRows.value = [];

const onChangeOrder = (event: DataTableSortEvent) => {
  if(props.sortMode === "single") {
    emits("sort:rows", [
      [ 
        event.sortField,
        event.sortOrder === 1 ? "asc" : "desc"
      ]
    ]);
  } else {
    emits("sort:rows", event.multiSortMeta.map(item => {
      return [
        item.field,
        item.order === 1 ? "asc" : "desc"
      ];
    }));
  }
};

const onRowReorder = (value: any[]) => {
  emits("reorder:rows", value);
};
const pt = {
  rowExpansion: "bg-gray-100",
  rowExpansionCell: "p-0",
};
const ptHeader = {
  sort: "flex align-items-center"
};
</script>
<style scoped>
:deep(.p-sortable-column .p-sortable-column-icon) {
  opacity: 0;
  transition: all .15s linear;
  width: 12px;
  height: 12px;
}
:deep(.p-sortable-column:hover .p-sortable-column-icon){
  opacity: 1 !important;
}
</style>
