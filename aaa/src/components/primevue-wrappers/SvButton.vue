<script setup lang="ts">
import PrimeVueButton from "primevue/button";
import { computedAttrsExcept } from "@/utils/AttrsFilter";
import {useAttrs} from "vue";

const attrs = useAttrs();
defineOptions({ inheritAttrs: false });
const allowedAttrs = computedAttrsExcept(["pt"], attrs);

const pt = {
  label: "white-space-nowrap",
  root: "flex-shrink-0"
};
</script>

<template>
  <PrimeVueButton v-bind="allowedAttrs" :pt="pt">
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
  </PrimeVueButton>
</template>
<style scoped>

</style>