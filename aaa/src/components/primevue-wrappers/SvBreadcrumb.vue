<script setup lang="ts">
import PrimeBreadcrumb from 'primevue/breadcrumb'
import { computedAttrsExcept } from './../../utils/AttrsFilter'; import {useAttrs} from "vue";

defineOptions({ inheritAttrs: false })
const allowedAttrs = computedAttrsExcept(['pt'], useAttrs())
</script>

<template>
  <PrimeBreadcrumb v-bind="allowedAttrs">
    <template
      v-for="(_, name, index) in ($slots as {})"
      v-slot:[name]="scope"
      :key="index"
    >
      <slot :name="name" v-bind="{ scope }"></slot>
    </template>
  </PrimeBreadcrumb>
</template>
