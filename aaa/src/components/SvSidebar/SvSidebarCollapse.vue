<template>
  <SvButton class="sv-sidebar-collapse" text severity="secondary" @click="click">
    <div class="flex align-items-center sv-sidebar-collapse-content">
      <SvIcon color="var(--menuitem-icon-color)" class="sv-sidebar-collapse-icon" :class="{ collapsed: collapsed }">>
        pi-angle-double-left
      </SvIcon>
      <span v-if="!collapsed" style="color: var(--menuitem-color)">
        {{ $t('Common.collapseSidebar') }}
      </span>
    </div>
  </SvButton>
</template>

<script setup lang="ts">
import SvIcon from '../SvIcon/SvIcon.vue';
import SvButton from '../primevue-wrappers/SvButton.vue';
import { ICollapseProps } from './SvSidebar.types';

const props = withDefaults(defineProps<ICollapseProps>(), {
  collapsed: false
});
const emit = defineEmits(
  [
    'click'
  ]
)
const click = () => emit('click');
</script>

<style lang="scss" scoped>
.sv-sidebar-collapse {
  width: 100%;
  height: 34px;
  white-space: nowrap;

  .sv-sidebar-collapse-content {
    column-gap: 0.5rem;

    .sv-sidebar-collapse-icon {
      transition: all 0.25s ease-out;

      &.collapsed {
        transform: rotate(180deg);
      }
    }
  }
}
</style>