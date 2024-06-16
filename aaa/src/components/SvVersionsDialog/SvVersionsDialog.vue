<template>
  <SvDialog v-model:visible="visible" modal :header="$t('Common.versionsModal.versions')"
    :style="{ width: '700px' }">
    <SvTable scrollable scrollHeight="50vh" :store="versionsStore" />
    <div class="flex justify-content-end gap-2">
      <SvButton text @click="visible = false">{{ $t('Common.close') }}</SvButton>
    </div>
  </SvDialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SvDialog from '../primevue-wrappers/SvDialog.vue';
import SvButton from '../primevue-wrappers/SvButton.vue';
import SvTable from '../SvTable/SvTable.vue';
import versionsStore from "../../store/versions/Table";

const model = defineModel(
  'value',
  {
    type: Boolean
  }
);

const visible = computed({ get: () => model.value, set: (value) => { model.value = value } });
</script>

<style lang="scss" scoped></style>