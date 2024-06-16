<template>
  <SvTag
    :rounded="rounded"
    :icon="icon"
    :outline="true"
    :class="[{'cursor-pointer': !readonly}]"
    :severity="selectedItem?.severity"
    :value="selectedItem?.value"
    @click="toggle"
  />
  <SvMenu
    ref="menu"
    :model="items"
    :popup="true"
  >
    <template #item="{item}">
      <div
        class="px-2 py-1 cursor-pointer"
        @click="onSelect(item)"
      >
        <SvTag
          :icon="selectedItem?.id == item?.id ? 'pi pi-check' : ''"
          :outline="true"
          :rounded="rounded"
          :severity="item?.severity"
          :value="item?.value"
        />
      </div>
    </template>
  </SvMenu>
</template>

<script setup lang="ts">
import SvTag from "../primevue-wrappers/SvTag.vue";
import {computed, ref} from "vue";
import {Item} from "./SvTagSelector.types";
import {getDefaultItemFromObjectList} from "@/use/useListItem";
import SvMenu from "../primevue-wrappers/SvMenu.vue";

export type IProps = {
  items: Item[],
  modelValue?: number,
  readonly?:boolean
  rounded?:boolean
}

const props = withDefaults(defineProps<IProps>(), {
  items: () => [],
  readonly: false,
  rounded: false
});

const emits = defineEmits(["update:modelValue"]);

const onSelect = (item: Item) => emits("update:modelValue", item.id);

const selectedItem = computed(() => getDefaultItemFromObjectList(props.items, props.modelValue, "id"));
const icon = computed(() => !props.readonly ? "pi pi-angle-down" : "");

const menu = ref(null);
const toggle = (event) => !props.readonly && menu.value.toggle(event);
</script>