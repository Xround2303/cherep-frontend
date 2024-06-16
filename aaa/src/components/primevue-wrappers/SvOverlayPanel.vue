<script setup lang="ts">
import PrimeOverlayPanel from "primevue/overlaypanel"
import { computedAttrsExcept } from "../../utils/AttrsFilter"; 
import {useAttrs, ref} from "vue";

defineOptions({ inheritAttrs: false })
const allowedAttrs = computedAttrsExcept(["pt"], useAttrs())

const op = ref();

defineExpose({
  show: (e: Event) => op.value.show(e),
  hide: (e: Event) => op.value.hide(e),
  toggle: (e: Event) => op.value.toggle(e),
})

const pt = {
  root: "shadow-none",
  content: "p-0"
}
</script>

<template>
  <PrimeOverlayPanel
    v-bind="allowedAttrs"
    ref="op"
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
  </PrimeOverlayPanel>
</template>
