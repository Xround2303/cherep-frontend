<script setup lang="ts">
import {computed} from "vue";
import SvHint from "../SvHint/SvHint.vue";
import SvActionBtn from "@/components/SvActionBtn/SvActionBtn.vue";
import {IProps} from "@/components/SvBreadcrumbs/SvBreadcrumbs.types";


const props = withDefaults(defineProps<IProps>(), {
  items: () => [],
  limitCountPageAfterDots: 2,
  limitCountPageWithoutDots: 5
});

const hiddenItems = computed(() => {
  // Если страниц больше определенного лимита, включаем логику скрытия страниц
  if(props.items.length <= props.limitCountPageWithoutDots.value) return [];

  return props.items.filter((item, i) => {

    // Всегда показывать первую страницу
    if(i === 0) {
      return false;
    }

    // Показывать страницы после "...", все остальное скрывать
    for(let k = 0; k < props.limitCountPageAfterDots; k++) {
      if (i === props.items.length - (k + 1)) {
        return false;
      }
    }

    return true;
  });
});

const isShowNesting = (itemIndex) => {
  return itemIndex === 1 && hiddenItems.value.length !== 0;
};
const isFirstItemMenu = (item, itemIndex) => {
  return itemIndex !== 0 && !hiddenItems.value.includes(item);
};
const isShowArrow = (item, itemIndex) => {
  return isFirstItemMenu(item, itemIndex) || isShowNesting(itemIndex);
};


</script>
<template>
  <div class="overflow-x-auto">
    <div class="breadcrumbs">
      <div class="breadcrumbs_wrapper">
        <template v-for="(item, i) of items">
          <div
            v-if="isShowArrow(item, i)"
            class="breadcrumbs_arrow"
          >
            <svg
              width="4"
              height="8"
              viewBox="0 0 4 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.506865 7.42858C0.448013 7.42886 0.389697 7.41738 0.335341 7.39481C0.280984 7.37225 0.231682 7.33906 0.190326 7.29719C0.106443 7.2132 0.0593262 7.09935 0.0593262 6.98065C0.0593262 6.86194 0.106443 6.74809 0.190326 6.66411L2.86001 3.99442L0.190326 1.32474C0.111203 1.23983 0.0681274 1.12752 0.0701749 1.01147C0.0722224 0.895428 0.119233 0.784707 0.201302 0.702638C0.283371 0.620569 0.394092 0.573559 0.510137 0.571511C0.626182 0.569464 0.738492 0.612539 0.823405 0.691662L3.80963 3.67788C3.89351 3.76187 3.94063 3.87572 3.94063 3.99442C3.94063 4.11313 3.89351 4.22698 3.80963 4.31096L0.823405 7.29719C0.782049 7.33906 0.732746 7.37225 0.67839 7.39481C0.624033 7.41738 0.565718 7.42886 0.506865 7.42858Z"
                fill="#6B7280"
              />
            </svg>
          </div>
          <template v-if="isShowNesting(i)">
            <SvActionBtn :items="hiddenItems">
              <template #activator="{ toggle, isActive }">
                <div class="breadcrumbs_item _nesting">
                  <div
                    :class="['breadcrumbs_nesting', {'_active': isActive}]"
                    @click="toggle"
                  >
                    <svg
                      width="16"
                      height="4"
                      viewBox="0 0 16 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.2 2.00002C3.2 2.88368 2.48366 3.60002 1.6 3.60002C0.716344 3.60002 0 2.88368 0 2.00002C0 1.11637 0.716344 0.400024 1.6 0.400024C2.48366 0.400024 3.2 1.11637 3.2 2.00002ZM7.99997 3.60002C8.88363 3.60002 9.59997 2.88368 9.59997 2.00002C9.59997 1.11637 8.88363 0.400024 7.99997 0.400024C7.11632 0.400024 6.39997 1.11637 6.39997 2.00002C6.39997 2.88368 7.11632 3.60002 7.99997 3.60002ZM14.4 3.60002C15.2837 3.60002 16 2.88368 16 2.00002C16 1.11637 15.2837 0.400024 14.4 0.400024C13.5164 0.400024 12.8 1.11637 12.8 2.00002C12.8 2.88368 13.5164 3.60002 14.4 3.60002Z"
                        fill="#6B7280"
                      />
                    </svg>
                  </div>
                </div>
              </template>
            </SvActionBtn>
          </template>
          <template v-else>
            <template v-if="!hiddenItems.includes(item)">
              <div
                :class="['breadcrumbs_item', {'_active': i !== items.length - 1}]"
              >
                <div class="breadcrumbs_eclipse">
                  {{ item.label }}
                </div>
                <div
                  v-if="i === items.length - 1 && $slots.default"
                  class="ml-2 flex align-items-center"
                >
                  <SvHint>
                    <slot  />
                  </SvHint>
                </div>
              </div>
            </template>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped>

.breadcrumbs_wrapper {
  display: inline-flex;
}
.breadcrumbs_eclipse {
  display: inline;
  max-width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.breadcrumbs_item {
  display: flex;
  align-items: center;
  white-space: nowrap;
  color: var(--global-text-color);
  transition: all .15s linear;

}
.breadcrumbs_item._active {
  cursor:pointer;
  color: var(--global-text-secondary-color);
  border-bottom: 1px solid var(--global-text-secondary-color);
}
.breadcrumbs_item:is(._active):hover {
  color: var(--theme-primary-color);
  border-color: var(--theme-primary-color);
}
.breadcrumbs_item + .breadcrumbs_item {
  margin-left: 10px
}
.breadcrumbs_arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  margin-right: 10px;
  margin-left: 10px;
}
.breadcrumbs_arrow svg path {
  fill: var(--breadcrumb-item-icon-color)
}
.breadcrumbs_item:first-child:before {
  content: none;
}
.breadcrumbs_nesting {
  border-radius: 100%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all .15s linear;
  color: var(--action-icon-color)
}
.breadcrumbs_nesting:hover {
  background: var(--action-icon-hover-background);
}
.breadcrumbs_nesting._active {
  background: var(--action-icon-hover-background);
}
.breadcrumbs_nesting svg path {
  fill: var(--action-icon-color)
}
.breadcrumbs_nesting:hover svg path {
  fill: var(--surface-900)
}
.breadcrumbs_nesting._active svg path {
  fill: var(--surface-900)
}

</style>