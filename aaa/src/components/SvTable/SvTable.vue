<template>
  <div class="flex flex-column h-full">
    <div class="flex-shrink-0 mb-3">
      <SvTableFilter
        v-if="withFilter"
        :store="store"
        :with-filter-history="withFilterHistory"
      >
        <template
          v-for="(_, name, index) in ($slots as {})"
          #[name]="scope: any"
          :key="index"
        >
          <slot
            :name="name"
            v-bind="scope"
          />
        </template>
      </SvTableFilter>
    </div>
    <div class="h-full overflow-y-auto">
      <SvDataTable
        :scrollable="!!scrollHeight"
        :scroll-height="scrollHeight"
        :style="style"
        :headers="store.headers.value"
        :rows="store.rows.value"
        :store="store"
        :with-drag-and-drop="withDragAndDrop"
        :primary-key="store?.primaryKey"
        :sort-mode="sortMode"
        :loading="store.isLoading.value"
        @edit:row="(row) => store.onEditRow(row)"
        @delete:row="(row) => store.onDeleteRow(row)"
        @sort:rows="(event) => store.onUpdateSortOrder(event)"
        @reorder:rows="(rows) => store.onUpdateRowReorder(rows)"
        @expand:row="(row) => store.onExpandRow(row)"
      >
        <template
          v-for="(_, name, index) in ($slots as {})"
          #[name]="scope: any"
          :key="index"
        >
          <slot
            :name="name"
            v-bind="scope"
          />
        </template>
      </SvDataTable>
    </div>
    <div class="flex-shrink-0 mt-3">
      <SvPaginator
        v-if="withPaginator"
        :rows="store.limit.value"
        :total-records="store.total.value"
        :rows-per-page-options="rowsPerPageOptions"
        @page="$event => store.onUpdatePageNumber($event.page + 1)"
      />
    </div>
  </div>
</template>
<script setup lang="ts" generic="TRow extends object">
import SvDataTable from "./SvDataTable.vue";
import {computed, onMounted, onUnmounted, watch} from "vue";
import SvTableFilter from "./SvTableFilter.vue";
import SvPaginator from "../primevue-wrappers/SvPaginator.vue";
import {IProps} from "./SvTable.types";
import {ISlots} from "./SvDataTable.types";
import {ISlots as ISlotsFilter} from "./SvTableFilter.types";

const props = withDefaults(defineProps<IProps<TRow>>(), {
  withFilter: false,
  withPaginator: false,
  withFilterHistory: false,
  withDragAndDrop: false,
  sortMode: "single",
  height: "100%",
  rowsPerPageOptions: () => [10, 20, 30],
});

const style = computed(() => ({
  height: props.height
}));

defineSlots<ISlots<TRow> & ISlotsFilter>();

const requestParams = computed(() => props.store.requestParams);
watch(requestParams, () => props.store?.onUpdateRows());

onMounted(() => {
  props.store.onUpdateHeaders();
  props.store.onUpdateRows();
});

onUnmounted(() => props.store.reset());
</script>