<script setup lang="ts">
import PrimeMessage from 'primevue/message'
import { computedAttrsExcept } from './../../utils/AttrsFilter'; import {useAttrs} from "vue";

defineOptions({ inheritAttrs: false })
const allowedAttrs = computedAttrsExcept(['pt'], useAttrs())
</script>

<template>
  <PrimeMessage v-bind="allowedAttrs">
    <template
      v-for="(_, name, index) in ($slots as {})"
      v-slot:[name]="scope"
      :key="index"
    >
      <slot :name="name" v-bind="{ scope }"></slot>
    </template>
  </PrimeMessage>
</template>
