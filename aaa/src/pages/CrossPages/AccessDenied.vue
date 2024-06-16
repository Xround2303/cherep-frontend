<script setup lang="ts">
import SvPage from '@/components/SvPage/SvPage.vue';

</script>

<template>
  <sv-page :title="$t('Common.accessDenied.title')">
    <div>{{ $t('Common.accessDenied.message') }}</div>
  </sv-page>
</template>
