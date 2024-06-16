<script setup lang="ts">
import PrimeChips from 'primevue/chips';
import { computedAttrsExcept } from '../../utils/AttrsFilter'; import {useAttrs} from "vue";

defineOptions({ inheritAttrs: false })
const allowedAttrs = computedAttrsExcept(['pt'], useAttrs())

const pt = {
  container: {
    class: "w-full"
  }
}
</script>

<template>
  <PrimeChips v-bind="allowedAttrs" :pt="pt">
    <template
      v-for="(_, name, index) in ($slots as {})"
      v-slot:[name]="scope"
      :key="index"
    >
      <slot :name="name" v-bind="{ scope }"></slot>
    </template>
  </PrimeChips>
</template>
