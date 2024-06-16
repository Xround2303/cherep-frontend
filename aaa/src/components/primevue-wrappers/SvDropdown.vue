<script setup lang="ts">
import PrimeDropdown from "primevue/dropdown";
import { computedAttrsExcept } from "@/utils/AttrsFilter"; 
import {useAttrs} from "vue";

defineOptions({ inheritAttrs: false });
const allowedAttrs = computedAttrsExcept(["pt"], useAttrs());
</script>

<template>
  <PrimeDropdown v-bind="allowedAttrs">
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
  </PrimeDropdown>
</template>
