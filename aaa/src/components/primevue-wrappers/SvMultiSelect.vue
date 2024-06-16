<script setup lang="ts">
import PrimeMultiSelect from "primevue/multiselect";
import { computedAttrsExcept } from "@/utils/AttrsFilter"; 
import {useAttrs} from "vue";

defineOptions({ inheritAttrs: false });
const allowedAttrs = computedAttrsExcept(["pt"], useAttrs());
</script>

<template>
  <PrimeMultiSelect v-bind="allowedAttrs">
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
  </PrimeMultiSelect>
</template>
