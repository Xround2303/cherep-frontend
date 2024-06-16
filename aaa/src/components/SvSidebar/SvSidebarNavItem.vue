<template>
  <SvMenuDropdown ref="smd" placement="right-start" :trigger="'manually'" :interactive="true" :appendTo="appendTo">
    <template #activator="{ state, trigger }">
      <component :is="linkable ? 'router-link' : 'div'" ref="item" class="sv-sidebar-nav-item-wrapper"
        :class="{ 'px-0 py-0': isMenu }" :to="{ name: workplace }">
        <SvButton text class="sv-sidebar-nav-item w-full flex align-items-center gap-2 cursor-pointer"
          :severity="active(state.isVisible || state.isShown) ? null : 'secondary'"
          :class="{ 
            active: active(state.isVisible || state.isShown), 
            'menuitem-typography': !active(state.isVisible || state.isShown), 
            'text-base-semibold-lineheight-100': active(state.isVisible || state.isShown), 
            expandable: withDropdown }"
          @click="expand(trigger)">
          <div v-if="showIcon" style="width: 14px">
            <SvIcon v-if="isRoot && icon"
              :color="`var(--menuitem${active(state.isVisible || state.isShown) ? '-active' : ''}-icon-color)`"
              class="p-overlay-badge">
              {{ icon }}
              <template #content>
                <SvBadge v-if="hasDotBadge && collapsed" :severity="dotBadgeSeverity" />
              </template>
            </SvIcon>
          </div>
          <div v-if="!collapsed" class="sv-sidebar-nav-item-text flex-grow-1 text-left">
            {{ $t(`Navs.${camelCase(reference_name)}`) }}
          </div>
          <SvBadge v-if="!collapsed" v-show="hasDotBadge" :severity="dotBadgeSeverity" :value="dotBadgeContent"
            class="flex-grow-0 ml-0" />
          <SvIcon v-if="withDropdown"
            :color="`var(--menuitem${active(state.isVisible || state.isShown) ? '-active' : ''}-icon-color)`"
            class="sv-sidebar-nav-item-icon flex align-items-center ml-auto justify-content-center"
            :class="{ expanded: isRoot && isExpanded }">
            mdi-chevron-right
          </SvIcon>
        </SvButton>
      </component>
    </template>
    <SvSidebarNavItem v-for="(item, index) of children" :key="index" ref="itemsComponents" v-bind="item"
      :show-icon="false" :is-menu="withMenu" @close-siblings="closeSiblings" />
  </SvMenuDropdown>
  <transition name="p-toggleable-content">
    <div v-if="!withMenu" v-show="isExpanded" class="overflow-hidden" style="flex: 0 0 fit-content">
      <SvSidebarNavItem v-for="(item, index) of children" :key="index" ref="itemsComponents" v-bind="item"
        @close-siblings="closeSiblings" />
    </div>
  </transition>
</template>

<script setup lang="ts">

import type { Item } from "./SvSidebar.types";
import { ref, computed, watch, onMounted } from "vue";
import SvIcon from "../SvIcon/SvIcon.vue";
import SvMenuDropdown from "../SvMenuDropdown/SvMenuDropdown.vue";
import { camelCase } from "lodash";
import SvButton from "../primevue-wrappers/SvButton.vue";
import SvBadge from "../primevue-wrappers/SvBadge.vue";
import useMenuStore from '@/store/menu';
import { useRouter } from "vue-router";
import { RouteRecordName } from "vue-router";

const router = useRouter();
const store = useMenuStore()

const props = withDefaults(defineProps<Item>(), {
  children: () => [],
  isRoot: false,
  isMenu: false,
  showIcon: true,
  collapsed: false,
})

const emit = defineEmits([
  'close-siblings'
]);

const item = ref();
const itemsComponents = ref([]);
const smd = ref();
const isExpanded = ref(false);

const appendTo = () => document.getElementById('sv-sidebar');
const hasDotBadge = computed(() => !!store.getMenuBadge(props.reference_name));
const dotBadgeSeverity = computed(() => store.getMenuBadge(props.reference_name)?.type);
const dotBadgeContent = computed(() => store.getMenuBadge(props.reference_name)?.content);

const withDropdown = computed(() => props.children.length > 0 && !props.collapsed);
const withMenu = computed(() => props.children.length > 0 && (!props.isRoot || props.collapsed));
const linkable = computed(() => props.children.length == 0 && !!props.workplace);
const routesMatched = computed(() => router.currentRoute.value.matched
  .map((item) => item.name));
const isRouteMatched = computed(() => !!(routesMatched.value
  .includes(props.workplace) ||
  !!routesMatched.value.find((route) => isChildrenMatched(route, props.children))));
const isChildrenMatched = (route?: RouteRecordName, children?: Item[]): boolean | undefined => {
  return children && !!children.find(child => child.workplace == route || isChildrenMatched(route, child.children));
};

onMounted(() => {
  if (isRouteMatched.value && withDropdown.value) {
    isExpanded.value = true;
  }
});

watch(() => props.collapsed, () => isExpanded.value = false);

const active = (state: boolean) => state || isExpanded.value || isRouteMatched.value;

const closeSiblings = (refName: string) => {
  itemsComponents.value.forEach((x: any) => {
    x.collapseByRef(refName);
  });
  emit('close-siblings', props.reference_name);
};

const expand = (trigger: Function) => {
  if (props.children.length > 0) {
    if (!props.isRoot || props.collapsed) {
      trigger();
    } else {
      isExpanded.value = !isExpanded.value;
    }
  }
  closeSiblings(props.reference_name);
};

const collapseByRef = (ref: string) => {
  if (ref !== props.reference_name) {
    isExpanded.value = false;
  }
}
defineExpose({
  collapseByRef
})
</script>

<style lang="scss" scoped>
.sv-sidebar-nav-item-wrapper {
  display: block;
  height: 35px;
  padding: 0.125rem 0.5rem;
  text-decoration: auto;

  .sv-sidebar-nav-item {
    height: 33px;
    border-radius: 6px;
    padding: 0.75rem;
    transition: all 0.25s ease-out;
    color: var(--menuitem-color);
    white-space: nowrap;
    text-overflow: ellipsis;

    &.menuitem-typography {
      font-size: var(--menuitem-typography-font-size);
      font-weight: var(--menuitem-typography-font-weight);
      line-height: var(--menuitem-typography-line-height);
    }

    &.active {
      color: var(--menuitem-active-color);

      &:not(.expandable) {
        background-color: var(--menuitem-active-background);
      }
    }

    .sv-sidebar-nav-item-icon {
      transition: all 0.25s ease-out;

      &.expanded {
        transform: rotate(90deg);
      }
    }

    .sv-sidebar-nav-item-text {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>