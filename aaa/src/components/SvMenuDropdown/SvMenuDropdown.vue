<template>
  <tippy v-bind="attrs" :arrow="false">
    <template #default="{ state, hide, show }">
      <slot
        name="activator"
        :state="state"
        :trigger="trigger(state.isShown, show, hide)"
        :show="show"
        :hide="hide"
      />
    </template>
    <template #content>
      <slot />
    </template>
  </tippy>
</template>
<script setup lang="ts">
import { useAttrs } from "vue";
import { Tippy } from "vue-tippy";
const attrs = useAttrs();
const trigger = (isShown: boolean, show: Function, hide: Function) => {
  return () => {
    isShown ? hide() : show();
  }
}
</script>