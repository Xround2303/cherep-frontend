<template>
  <tippy
    :placement="placement"
    :arrow="arrow"
    :trigger="'click'"
    :offset="[0, 5]"
    :animation="'fade'"
    :interactive="true"
    :max-width="500"
  >
    <div class="inline-block cursor-pointer flex align-items-center">
      <slot name="icon">
        <i class="pi pi-question-circle" />
      </slot>
    </div>
    <template #content>
      <div class="p-3">
        <slot />
      </div>
    </template>
  </tippy>
</template>

<script setup lang="ts">
import { Tippy } from "vue-tippy";
import {IProps, ISlots} from "@/components/SvHint/SvHint.types";

withDefaults(defineProps<IProps>(), {
  placement: "bottom-end",
  arrow: false,
});
defineSlots<ISlots>();
</script>