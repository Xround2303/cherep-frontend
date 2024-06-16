<template>
  <div class="text-2xl-semibold-lineheight-100">
    {{ title }}
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: String
});
</script>