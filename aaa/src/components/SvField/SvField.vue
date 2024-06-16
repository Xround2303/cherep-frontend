<template>
  <div>
    <div class="mb-2 flex align-items-center">
      <div class="w-full">
        <span class="font-bold">
          <slot name="title">{{ label }}</slot>
        </span>
        <span v-if="required">*</span>
      </div>
      <div class="ml-auto flex align-items-center">
        <div
          v-if="hint"
          class="label-item"
        >
          <SvHint
            :arrow="true"
            :placement="'right-start'"
          >
            {{ hint }}
          </SvHint>
        </div>
        <div
          v-if="errorMessages && typeErrorVisible === EnumErrorVisible.label"
          class="label-item"
        >
          <SvHint
            :arrow="true"
            :placement="'right-start'"
          >
            <template #icon>
              <i class="pi pi-question-circle text-red-300" />
            </template>
            {{ errorMessages }}
          </SvHint>
        </div>
      </div>
    </div>
    <div class="w-100 field-content">
      <slot :invalid="!!errorMessages" />
    </div>
    <div
      v-if="errorMessages && typeErrorVisible === EnumErrorVisible.bottom"
      class="mt-2 text-red-300"
    >
      {{ errorMessages }}
    </div>
  </div>
</template>
<script setup lang="ts">

import {EnumErrorVisible, IProps, ISlots} from "@/components/SvField/SvField.types";
import SvHint from "@/components/SvHint/SvHint.vue";

withDefaults(defineProps<IProps>(), {
  typeErrorVisible: EnumErrorVisible.bottom,
  required: false
});

defineSlots<ISlots>();
</script>
<style scoped>
.label-item + .label-item {
  margin-left: 8px;
}
.field-content > * {
  width: 100%
}
</style>