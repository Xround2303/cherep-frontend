<script setup lang="ts">
import PrimeTieredMenu from 'primevue/tieredmenu'
import { computedAttrsExcept } from '../../utils/AttrsFilter'; import {useAttrs} from "vue";
import {ref} from "vue";

defineOptions({ inheritAttrs: false })
const allowedAttrs = computedAttrsExcept(['pt'], useAttrs())


const op = ref();

defineExpose({
  show: (e: Event) => op.value.show(e),
  hide: (e: Event) => op.value.hide(e),
  toggle: (e: Event) => op.value.toggle(e),
})

</script>

<template>
  <PrimeTieredMenu v-bind="allowedAttrs" ref="op">
    <template
      v-for="(_, name, index) in ($slots as {})"
      v-slot:[name]="scope"
      :key="index"
    >
      <slot :name="name" v-bind="{ scope }"></slot>
    </template>
  </PrimeTieredMenu>
</template>
