<template>
  <div class="flex">
    <slot name="before-search" />
    <SvFilterInput
      :model-value="store.search.value"
      @update:model-value="text => store.onUpdateSearch(text)"
    />
    <SvTableOption
      :headers="store.headers.value"
      :headers-default="store.headersDefault"
      @update:model-value="store.onApplyOptionHeaders($event)"
    />
    <SvButton
      :icon="'pi pi-refresh'"
      class="ml-2 flex-shrink-0"
      @click="onRefreshTable"
    />
    <slot name="after-search" />
  </div>
</template>
<script setup lang="ts" generic="TRow extends object">
import SvButton from "../primevue-wrappers/SvButton.vue";
import SvFilterInput from "./SvFilterInput.vue";
import SvTableOption from "./SvTableOption.vue";
import {IProps} from "./SvTableFilter.types";

const props = withDefaults(defineProps<IProps<TRow>>(), {
  withFilterHistory: true,
});

const onRefreshTable = () => props.store.onUpdateRows();

</script>