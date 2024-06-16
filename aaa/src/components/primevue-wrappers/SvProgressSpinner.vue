<script setup lang="ts">
import PrimeProgressSpinner from "primevue/progressspinner";
import { computedAttrsExcept } from "@/utils/AttrsFilter"; 
import {useAttrs} from "vue";

defineOptions({ inheritAttrs: false });
const allowedAttrs = computedAttrsExcept(["pt"], useAttrs());
</script>

<template>
  <PrimeProgressSpinner v-bind="allowedAttrs">
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
  </PrimeProgressSpinner>
</template>
