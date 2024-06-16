<template>
  <SvButton
    :icon="'pi pi-cog'"
    class="ml-2 flex-shrink-0"
    @click="toggle"
  />
  <SvOverlayPanel ref="op">
    <SvCard class="w-23rem">
      <template #title>
        Настройка таблицы
      </template>
      <template #subtitle>
        Выберите порядок и поля для отображения в таблице
      </template>

      <draggable
        :list="headers1"
        item-key="field"
        class="list-group"
        ghost-class="ghost"
        animation="200"
        handle=".handle"
      >
        <template #item="{element}">
          <div
            class="flex align-items-center 1 border-bottom-1 border-black-alpha-10 p-1 pb-2 my-2 cursor-pointer"
            @click="onChangeVisible(element)"
          >
            <div class="mr-2 handle cursor-move">
              <i class="pi pi-bars" />
            </div>
            <SvCheckbox
              class="mr-2"
              :model-value="values"
              :value="element.field"
            />
            <div>{{ element.header }}</div>
          </div>
        </template>
      </draggable>

      <template #footer>
        <div class="flex">
          <SvButton
            label="По умолчанию"
            text
            @click="onApplyDefaultOption"
          />
          <SvButton
            label="Применить"
            class="ml-auto"
            @click="onApplyOption"
          />
        </div>
      </template>
    </SvCard>
  </SvOverlayPanel>
</template>
<script setup lang="ts">
import SvButton from "../primevue-wrappers/SvButton.vue";
import {computed, ref, toRaw, watch} from "vue";
import SvOverlayPanel from "../primevue-wrappers/SvOverlayPanel.vue";
import SvCheckbox from "../primevue-wrappers/SvCheckbox.vue";
import SvCard from "../primevue-wrappers/SvCard.vue";
import draggable from "vuedraggable/src/vuedraggable";
import {cloneDeep} from "lodash";
import type {ColumnProps} from "primevue/column";
import {IProps} from "./SvTableOption.types";


const emits = defineEmits([
  "update:model-value",
]);

const props = defineProps<IProps>();
const propHeaders = computed(() => props.headers);
const headers1 = ref<ColumnProps[]>([]);
const values = computed(() => headers1.value.filter(item => !item.hidden).map(item => item.field));
const op = ref();


const toggle = (event) => {
  op.value.toggle(event);
};

const onChangeVisible = (column: ColumnProps) => {
  const header = headers1.value.find(item => item.field === column.field);
  if(!header) return false;
  header.hidden = !header?.hidden;
};

const onApplyOption = () => {
  emits("update:model-value", headers1.value);
  toggle(false);
};

const onApplyDefaultOption = () => {
  headers1.value = cloneDeep(toRaw(props.headersDefault)) as ColumnProps[];
};

watch(propHeaders, (v) => headers1.value = cloneDeep(toRaw(v)));

</script>