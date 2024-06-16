<template>
  <i :class="computedClasses" :style="[`color: ${color}`, `font-size: ${size}`]">
    <slot name="content"></slot>
  </i>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { IProps } from "./SvIcon.types";

const props = withDefaults(defineProps<IProps>(), {
  icon: () => '',
  color: () => 'var(--action-icon-color)',
  size: () => '14px'
});

const slots = useSlots();

const computedIcon = computed(() => props.icon !== '' ? props.icon : slots.default?.()?.[0]?.children?.toString());

const computedClasses = computed(() => {
  const result: Record<string, boolean | undefined> = {}
  if (computedIcon.value) {
    result[computedIcon.value] = true;
    const iconType = computedIcon.value?.split('-')[0];
    if (iconType) {
      result[iconType] = true;
    }
  }
  return result;
});
</script>