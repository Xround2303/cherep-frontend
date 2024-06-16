<template>
  <div>
    <slot
      name="activator"
      :on-open-dialog="onOpenDialog"
    />
  </div>
  <SvDialog
    ref="dialog"
    v-model:visible="visible"
    modal
    :draggable="true"
    :show-header="false"
    :style="style"
  >
    <template #container>
      <SvCard style="max-height: 700px; overflow: hidden; display: flex">
        <template #[`header.action.btn`]>
          <slot name="header.action.btn">
            <SvButton
              icon="pi pi-times"
              @click="onCloseDialog"
            />
          </slot>
        </template>
        <template #title>
          <div @mousedown="onDrag">
            <slot name="title">
              Заголовок
            </slot>
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
          #default
        >
          <slot />
        </template>
        <template
          v-if="isShowFooter"
          #footer
        >
          <div class="flex justify-content-end">
            <slot
              name="footer"
              :on-close-dialog="onCloseDialog"
            >
              <SvButton
                :outlined="true"
                label="Отменить"
                @click="onCloseDialog"
              />
              <SvButton
                label="Создать"
                class="ml-2"
                @click="onCloseDialog"
              />
            </slot>
          </div>
        </template>
      </SvCard>
    </template>
  </SvDialog>
</template>
<script setup lang="ts">
import {computed, ref} from "vue";
import SvDialog from "../primevue-wrappers/SvDialog.vue";
import SvButton from "../primevue-wrappers/SvButton.vue";
import SvCard from "../primevue-wrappers/SvCard.vue";
import {IProps, ISlots} from "@/components/SvCardDialog/SvCardDialog.types";
import {ISlots as SvCardISlots} from "@/components/primevue-wrappers/SvCard.vue";


defineSlots<SvCardISlots & ISlots>();

const props = withDefaults(defineProps<IProps>(), {
  width: "60rem",
  isShowFooter: true
});

const emits = defineEmits([
  "close"
]);

const style = computed(() => ({
  width: props.width,
}));

const dialog = ref();
const visible = ref(false);
const onDrag = (e) => dialog.value.initDrag(e);
const onOpenDialog = () => visible.value = true;

const onCloseDialog = () => {
  visible.value = false;
  emits("close");
};

defineExpose({
  onOpenDialog
});
</script>