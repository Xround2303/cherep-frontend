<script setup lang="ts">
import PrimePaginator from "primevue/paginator";
import { computedAttrsExcept } from "@/utils/AttrsFilter";
import {useAttrs} from "vue";

const pt = {
  root: {
    class: "justify-content-end p-0"
  },
  rowPerPageDropdown: {
    root:"mr-0"
  }
};

defineOptions({ inheritAttrs: false });
const allowedAttrs = computedAttrsExcept(["pt"], useAttrs());
</script>

<template>
  <PrimePaginator
    v-bind="allowedAttrs"
    :pt="pt"
  >
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
  </PrimePaginator>
</template>
