<template>
  <div class="flex align-items-center w-full tool-bar">
    <SvBreadcrumbs :items="breadcrumbs">
      <template
        v-if="hint"
        #default
      >
        {{ hint }}
      </template>
    </SvBreadcrumbs>
    <div class="flex ml-auto">
      <SvLangSelector />
      <SvActionBtn :items="profileMenuItems">
        <template #activator="{ toggle }">
          <SvButton
            :label="userName"
            icon="pi pi-angle-down"
            size="small"
            text
            icon-pos="right"
            class="mr-3"
            @click="toggle"
          />
        </template>
      </SvActionBtn>
      <SvThemeSelector />
    </div>
  </div>
</template>

<script setup lang="ts">
import SvBreadcrumbs from "../SvBreadcrumbs/SvBreadcrumbs.vue";
import SvButton from "../primevue-wrappers/SvButton.vue";
import SvActionBtn from "../SvActionBtn/SvActionBtn.vue";
import {IProps} from "@/components/SvToolbar/SvToolbar.types";
import {computed, ComputedRef} from "vue";
import useAuthStore from "@/store/auth";
import useProfileStore from "@/store/profile";
import { useI18n } from "vue-i18n";
import SvLangSelector from "@/components/SvLangSelector/SvLangSelector.vue";
import SvThemeSelector from "@/components/SvThemeSelector/SvThemeSelector.vue";
import {useContextManager} from "@/plugins/contextManager";
import {MenuItem} from "primevue/menuitem";

const authStore = useAuthStore();
const profileStore = useProfileStore();
const route = useContextManager().router().currentRoute;

const { t } = useI18n();


defineProps<IProps>();

const breadcrumbs:ComputedRef<MenuItem[]> = computed(() => {
  return useContextManager().router().currentRoute.value.matched.map(item => {
    return {
      label: typeof item.meta?.title === "function" 
        ? item.meta?.title(route) 
        : item.meta?.title ?? "Название не указано"
    };
  });
});


const hint = computed(() => {
  return useContextManager().router().currentRoute.value.meta?.nameHelpHref;
});

const canProfile = computed(() => profileStore.checkHasPermission("Profile"));
const profileMenuItems = computed(() => [
  ...(canProfile.value ? [{
    label: t("Navs.refProfile"),
    command: () => useContextManager().router().push({ name: "Profile" })
  }] : []),
  {
    label: t("Common.logout"),
    command: async () => {
      await authStore.dispatchLogout();
      useContextManager().router().push({ name: "Login" });
    }
  },
]);

const userName = computed(() => profileStore.userShortName);

</script>
<style scoped>
.tool-bar {
  height: 40px;
  min-height: 40px;
}
</style>
