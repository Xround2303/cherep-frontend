<template>
  <div class="product-title-container flex align-items-center">
    <SvImage :src="computedLogo" :image-style="{ 'height': xl ? '40px' : '28px' }" />
    <div v-if="!collapsed">
      <span class="product-title-span" :style="{ color: inverse ? 'var(--primary-color)' : 'var(--text-color)' }"
        :class="{ 'text-xl-semibold-lineheight-auto': !xl, 'text-4xl-semibold-lineheight-auto': xl }">
        {{ computedTitleFirstPart }}
      </span>
      <span class="product-title-span" :style="{ color: inverse ? 'var(--text-color)' : 'var(--primary-color)' }"
        :class="{ 'text-xl-semibold-lineheight-auto': !xl, 'text-4xl-semibold-lineheight-auto': xl }">
        {{ computedTitleSecondPart }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">

import { IProps } from "./SvProductTitle.types";
import SvImage from "../primevue-wrappers/SvImage.vue";
import { computed } from "vue";
import useStore from "../../store/env/index";

const store = useStore();

const props = defineProps<IProps>();

const computedTitle = computed(() => props.title ?? store.getAppTitle);
const computedTitleSplit = computed(() => props.titleSplit ?? store.getAppTitleSplit);
const computedTitleFirstPart = computed(() => computedTitle.value.slice(0, computedTitleSplit.value));
const computedTitleSecondPart = computed(() => computedTitle.value.slice(computedTitleSplit.value));
const computedLogo = computed(() => props.logo ?? store.getAppLogo);

</script>
<style lang="scss" scoped>
.product-title-container {
  height: 40px;
  column-gap: 8px;
  padding: 6px 12px;
}
</style>
