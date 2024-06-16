<template>
  <SvActionBtn :items="itemList">
    <template #activator="{ toggle }">
      <SvButton
        icon="pi pi-angle-down"
        size="small"
        :label="envStore.langSelected.toLocaleUpperCase()"
        text
        icon-pos="right"
        @click="toggle"
      />
    </template>
  </SvActionBtn>
</template>
<script setup lang="ts">
import SvActionBtn from "@/components/SvActionBtn/SvActionBtn.vue";
import SvButton from "@/components/primevue-wrappers/SvButton.vue";
import useEnvStore from "@/store/env";
import {computed} from "vue";
const envStore = useEnvStore();

const itemList = computed(() =>
  envStore.locales.map(
    locale => ({
      label: locale.name,
      command: () => envStore.setLang(locale.code)
    })
  )
);



</script>