<script setup lang="ts">
import PrimeDialog from "primevue/dialog";
import { computedAttrsExcept } from "@/utils/AttrsFilter";
import {useAttrs, ref} from "vue";

defineOptions({ inheritAttrs: false });
const allowedAttrs = computedAttrsExcept(["pt"], useAttrs());

const op = ref();

defineExpose({
  initDrag: (e: Event) => op.value.initDrag(e)
});
</script>

<template>
  <PrimeDialog
    v-bind="allowedAttrs"
    ref="op"
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
  </PrimeDialog>
</template>
