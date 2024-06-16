<script setup lang="ts">
import PrimeTerminal from 'primevue/terminal'
import { computedAttrsExcept } from './../../utils/AttrsFilter'; import {useAttrs} from "vue";

defineOptions({ inheritAttrs: false })
const allowedAttrs = computedAttrsExcept(['pt'], useAttrs())
</script>

<template>
  <PrimeTerminal v-bind="allowedAttrs">
    <template
      v-for="(_, name, index) in ($slots as {})"
      v-slot:[name]="scope"
      :key="index"
    >
      <slot :name="name" v-bind="{ scope }"></slot>
    </template>
  </PrimeTerminal>
</template>
