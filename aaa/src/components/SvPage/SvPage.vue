<template>
  <div class="sv-page flex flex-column px-5 py-4">
    <slot
      name="title"
      :title="title"
    >
      <div>
        <slot name="before-title" />
        <div>
          <SvPageTitle :title="title" />
        </div>
        <slot name="after-title" />
      </div>
    </slot>
    <div class="sv-page-body">
      <slot name="default" />
    </div>
  </div>
</template>
<script setup lang="ts">
import SvPageTitle from "../SvPageTitle/SvPageTitle.vue";
defineProps({
  title: String
});
</script>

<style lang="scss" scoped>
.sv-page {
  height: 100%;
  gap: 1rem;

  .sv-page-body {
    flex: 1 0 0;
  }
}
</style>
