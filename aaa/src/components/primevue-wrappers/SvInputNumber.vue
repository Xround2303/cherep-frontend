<script lang="ts" setup>
import PrimeInputNumber from "primevue/inputnumber";
import {computedAttrsExcept} from "@/utils/AttrsFilter";
import {useAttrs} from "vue";

defineOptions({inheritAttrs: false});
const allowedAttrs = computedAttrsExcept(["pt"], useAttrs());
</script>

<template>
  <PrimeInputNumber v-bind="allowedAttrs">
    <template
      v-for="(_, name, index) in ($slots as {})"
      :key="index"
      #[name]="scope"
    >
      <slot
        :name="name"
        v-bind="{ scope }"
      />
    </template>
  </PrimeInputNumber>
</template>
