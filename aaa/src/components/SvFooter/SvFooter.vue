<template>
  <div class="sv-footer">
    <div v-if="!collapsed" class="sv-footer-expanded">
      <span class="text-xs link" @click.prevent="openVersion">
        {{ $t('Common.version') }}
      </span>
      <div class="text-xs">
        <span style="color: var(--menuitem-color)">
          &copy;
          {{ new Date().getFullYear() }}
          <a class="link" :href="footerHref" target="_blank">{{ footerHrefText }}</a>
        </span>
      </div>
    </div>
    <SvButton v-else icon text class="info-button" severity="secondary">
      <SvIcon color="var(--menuitem-icon-color)">
        pi-info-circle
      </SvIcon>
    </SvButton>
    <SvVersionsDialog v-model:value="opened" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import useStore from "../../store/env/index";
import SvIcon from "../SvIcon/SvIcon.vue";
import SvButton from "../primevue-wrappers/SvButton.vue";
import SvVersionsDialog from "../SvVersionsDialog/SvVersionsDialog.vue";
import { IProps } from "./SvFooter.types";

const props = withDefaults(defineProps<IProps>(), {
  collapsed: false
});

const store = useStore();

const opened = ref(false);

const footerHref = computed(() => {
  const footerHref = store.getFooterHref;
  return footerHref;
});

const footerHrefText = computed(() => {
  const footerHrefText = store.getFooterHrefText;
  return footerHrefText;
});

const openVersion = () => { opened.value = true };
</script>

<style lang="scss" scoped>
.sv-footer {
  white-space: nowrap;
}

.sv-footer-expanded {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
}

.link {
  //TODO: Remake to variable
  color: #0B54C2;
  text-decoration: auto;
  cursor: pointer;
}

.info-button {
  height: 34px;
}
</style>
