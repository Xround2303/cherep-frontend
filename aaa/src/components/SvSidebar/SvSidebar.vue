<template>
  <div id="sv-sidebar" class="sv-sidebar flex flex-column h-full" :class="{ collapsed }">
    <div class="flex-shrink-0">
      <SvProductTitle :collapsed="collapsed" />
    </div>
    <PerfectScrollbar class="h-full flex flex-column" :options="scrollBarSettings">
      <SvSidebarNavItem v-for="item in items" v-bind="item" ref="itemsComponents" :is-root="true" :collapsed="collapsed"
        @close-siblings="closeSiblings" />
    </PerfectScrollbar>
    <div class="sv-sidebar-collapse-border flex-shrink-0">
      <SvSidebarCollapse :collapsed="collapsed" @click="collapse" />
    </div>
    <div class="sv-sidebar-footer-border flex-shrink-0">
      <SvFooter :collapsed="collapsed" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SvProductTitle from "../SvProductTitle/SvProductTitle.vue";
import { IProps } from "./SvSidebar.types";
import SvSidebarNavItem from "./SvSidebarNavItem.vue";
import SvSidebarCollapse from "./SvSidebarCollapse.vue";
import SvFooter from "../SvFooter/SvFooter.vue";
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

withDefaults(defineProps<IProps>(), {
  items: () => []
})

const scrollBarSettings = {
  suppressScrollX: true,
  maxScrollbarLength: 100,
};

const itemsComponents = ref([]);
const collapsed = ref(false);
const collapse = () => collapsed.value = !collapsed.value;

const closeSiblings = (refName: string) => {
  itemsComponents.value.forEach((x: any) => {
    x.collapseByRef(refName);
  });
};
</script>

<style lang="scss" scoped>
@import 'vue3-perfect-scrollbar/style.css';
.sv-sidebar {
  background-color: var(--horizontal-menu-background);
  border-right: 1px solid var(--horizontal-menu-border-color);
  width: 252px;
  min-width: 252px;
  transition: all ease-in-out 0.25s;
  overflow: hidden;

  &.collapsed {
    width: 52px;
    min-width: 52px;
  }

  .sv-sidebar-collapse-border {
    border-top: 1px solid var(--horizontal-menu-border-color);
  }

  .sv-sidebar-footer-border {
    border-top: 1px solid var(--horizontal-menu-border-color);
  }
}
</style>