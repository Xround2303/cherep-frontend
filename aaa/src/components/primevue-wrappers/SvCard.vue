<script setup lang="ts">
import PrimeCard from "primevue/card";
import { computedAttrsExcept } from "@/utils/AttrsFilter"; 
import {useAttrs} from "vue";

defineOptions({ inheritAttrs: false });
const allowedAttrs = computedAttrsExcept(["pt"], useAttrs());

export type ISlotFooter = {
  footer: () => any,
}

export type ISlots = {
  title: () => any,
  "header.action.btn": () => any,
  subtitle: () => any,
  default: () => any
}

defineSlots<ISlots & ISlotFooter>();

const pt = {
  caption: "border-bottom-1 border-black-alpha-10 px-4 py-3",
  body: "flex flex-column w-full p-0",
  content: "h-full overflow-y-auto overflow-x-hidden p-4",
  footer: "border-top-1 border-black-alpha-10 px-4 py-3",
  title: "m-0"
};
</script>

<template>
  <PrimeCard
    v-bind="allowedAttrs"
    :pt="pt"
  >
    <template
      v-if="$slots.title || $slots['header.action.btn']"
      #title
    >
      <div class="flex align-items-center">
        <div
          v-if="$slots.title"
          class="w-full"
        >
          <slot name="title" />
        </div>
        <div
          v-if="$slots['header.action.btn']"
          class="flex-shrink-0 ml-auto"
        >
          <slot name="header.action.btn" />
        </div>
      </div>
    </template>
    <template
      v-if="$slots.subtitle"
      #subtitle
    >
      <slot name="subtitle" />
    </template>
    <template
      v-if="$slots.default"
      #content
    >
      <slot />
    </template>
    <template
      v-if="$slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>
  </PrimeCard>
</template>
