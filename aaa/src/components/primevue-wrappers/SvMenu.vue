<script setup lang="ts">
import PrimeMenu, {MenuProps, MenuSlots} from 'primevue/menu'
import {computed, ref} from "vue";

const op  = ref<InstanceType<typeof PrimeMenu> | null>(null)
const isActive = computed(() => op.value?.overlayVisible)

defineExpose({
  show: (e: Event) => op.value.show(e),
  hide: (e: Event) => op.value.hide(e),
  toggle: (e: Event) => op.value.toggle(e),
  isActive: isActive
})

defineSlots<MenuSlots>()
const props = withDefaults(defineProps<MenuProps>(), {
  popup: true
})

const pt = {
  content: {
    style: "max-width: 500px"
  }
}
</script>

<template>
  <PrimeMenu v-bind="props" ref="op" :pt="pt">
    <template
      v-for="(_, name, index) in ($slots as {})"
      v-slot:[name]="scope"
      :key="index"
    >
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </PrimeMenu>
</template>