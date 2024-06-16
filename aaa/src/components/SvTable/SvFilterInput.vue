<template>
  <SvInputText
    class="w-full"
    :value="modelValue"
    @update:model-value="emits('update:modelValue', $event)"
  />
  <SvButton
    :icon="'pi pi-filter'"
    class="ml-2 flex-shrink-0"
    @click="visible = true"
  />
  <SvDialog
    v-model:visible="visible"
    modal
    header="Фильтр"
    :style="{ width: '60%' }"
  >
    <div class="grid">
      <div
        v-for="i of [...Array(6).keys()]"
        class="col-6"
      >
        <label>
          <span class="block mb-2">Заголовок поля</span>
          <SvInputText class="w-full" />
        </label>
      </div>
    </div>
    <template #footer>
      <SvButton
        label="Cancel"
        text
        severity="secondary"
        autofocus
        @click="visible = false"
      />
      <SvButton
        label="Save"
        outlined
        autofocus
        @click="visible = false"
      />
    </template>
  </SvDialog>
</template>
<script setup lang="ts">

import SvInputText from "../primevue-wrappers/SvInputText.vue";
import SvDialog from "../primevue-wrappers/SvDialog.vue";
import SvButton from "../primevue-wrappers/SvButton.vue";
import {Ref, ref} from "vue";

type IProps = {
  modelValue: string,
}
const emits = defineEmits([
  "update:modelValue"
]);
const props = withDefaults(defineProps<IProps>(), {

});

const visible = ref(false);

</script>