<script lang="ts" setup>
import SvButton from "../primevue-wrappers/SvButton.vue";
import {computed, ref} from "vue";
import SvMenu from "../primevue-wrappers/SvMenu.vue";
import {MenuItem} from "primevue/menuitem";
import {MenuSlots} from "primevue/menu";

type IProps = {
  items: MenuItem[]
}

withDefaults(defineProps<IProps>(), {
  items: () => []
});

type ISlots = {
  activator: (props: {
    toggle: (event: Event) => any,
    isActive: boolean
  }) => any,
}

defineSlots<ISlots & MenuSlots>();
const op  = ref<InstanceType<typeof SvMenu> | null>(null);
const toggle = (event: Event) => {
  op.value?.toggle(event);
};

const isActivePopupMenu = computed(() => op.value?.isActive);

</script>

<template>
  <slot
    :name="'activator'"
    :toggle="toggle"
    :is-active="isActivePopupMenu"
  >
    <SvButton
      :icon="'pi pi-bars'"
      @click="toggle"
    />
  </slot>
  <SvMenu
    ref="op"
    :model="items"
    :popup="true"
  >
    <template
      v-for="(_, name, index) in ($slots as {})"
      #[name]="scope"
      :key="index"
    >
      <slot
        :name="name"
        v-bind="scope"
      />
    </template>
  </SvMenu>
</template>
