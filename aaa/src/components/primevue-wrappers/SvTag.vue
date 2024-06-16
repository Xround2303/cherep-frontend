<script setup lang="ts">
import PrimeTag from "primevue/tag";
import { computedAttrsExcept } from "@/utils/AttrsFilter";
import {computed, useAttrs} from "vue";
import {IProps} from "@/components/primevue-wrappers/types/SvTag.types";

defineOptions({ inheritAttrs: false });
const allowedAttrs = computedAttrsExcept(["pt"], useAttrs());


const props = withDefaults(defineProps<IProps>(), {
  outline: false,
});

const bind = computed(() => {
  return {
    ...allowedAttrs.value,
    ...props,
  }
})

const pt = computed(() => ({
  root: props.outline ? "p-tag--outline" : ""
}));

</script>

<template>
  <PrimeTag
    v-bind="bind"
    :pt="pt"
  >
    <template
      v-for="(_, name, index) in ($slots as {})"
      #[name]="scope"
      :key="index"
    >
      <slot
        :name="name"
        v-bind="{ scope }"
      />
    </template>
  </PrimeTag>
</template>
<style scoped>
.p-tag {
  border: 1px solid transparent;
}
.p-tag--outline {
  background: var(--primary-50);
  border: 1px solid var(--primary-500);
  color: var(--primary-500)
}
.p-tag--outline.p-tag-warning {
  background: var(--red-50);
  border: 1px solid var(--red-500);
  color: var(--red-500)
}
.p-tag--outline.p-tag-secondary {
  background: var(--red-50);
  border: 1px solid var(--red-500);
  color: var(--red-500)
}
.p-tag--outline.p-tag-success {
  background: var(--primary-50);
  border: 1px solid var(--red-500);
  color: var(--red-500)
}
.p-tag--outline.p-tag-info {
  background: var(--red-50);
  border: 1px solid var(--red-500);
  color: var(--red-500)
}
.p-tag--outline.p-tag-danger {
  background: var(--red-50);
  border: 1px solid var(--red-500);
  color: var(--red-500)
}
.p-tag--outline.p-tag-contrast {
  background: white;
  border: 1px solid #b7b7b7;
  color: #333
}
</style>