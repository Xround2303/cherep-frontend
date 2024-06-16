<template>
  <SvToast  group="bc" >
    <template #message="slotProps">
      <div class="flex flex-column w-full">
        <div class="mb-3">
          {{ slotProps.scope.message.summary }}
        </div>
        <div>
          <SvButton label="Детали"  outlined></SvButton>
        </div>
      </div>
    </template>
  </SvToast>
  <SvButton label="Show" @click="show()" />
</template>
<script setup lang="ts">
import SvToast from '../primevue-wrappers/SvToast.vue';
import { useToast } from 'primevue/usetoast';
import SvButton from "../primevue-wrappers/SvButton.vue";

const toast = useToast();
const onClose = function () {
  console.debug(123)
}

const show = function () {
  toast.add({
    severity: 'success',
    summary: 'Can you send me the report?',
    group: 'bc',
    life: 2000
  });
/*  toast.add({
    severity: 'info',
    summary: 'Can you send me the report?',
    group: 'bc',
    life: 2000
  });
  toast.add({
    severity: 'warn',
    summary: 'Can you send me the report?',
    group: 'bc',
    life: 2000
  });*/
}
</script>