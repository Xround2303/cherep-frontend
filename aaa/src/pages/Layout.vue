<script setup lang="ts">
import SvSidebar from "@/components/SvSidebar/SvSidebar.vue";
import SvToolbar from "@/components/SvToolbar/SvToolbar.vue";
import type { TProfileData } from "@/api/profile";
import useProfileStore from "@/store/profile";
import { ref, computed, onMounted } from "vue";

const store = useProfileStore();

const profileData = ref<TProfileData>();
const sidebarTree = computed(() => {
  return profileData.value === undefined ? [] : profileData.value.navTree;
});

const loadProfile = async () => {
  profileData.value = await store.getProfile();
};

onMounted(async () => {
  await loadProfile();
});

</script>

<template>
  <div
    id="svyazcom-app"
    class="layout"
  >
    <sv-sidebar
      class="layout-sidebar"
      :items="sidebarTree"
    />
    <div class="layout-body">
      <sv-toolbar class="layout-toolbar px-5" />
      <div class="layout-content">
        <slot name="default">
          <router-view :key="$route.path" />
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  width: 100vw;
  display: flex;

  .layout-body {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    overflow: auto;

    .layout-toolbar {
      flex: 0 0 fit-content;
      border-bottom: 1px solid var(--editor-toolbar-border-color)
    }

    .layout-content {
      flex: 1 0 0;
      overflow: auto;
    }
  }
}
</style>
