<script setup lang="ts">
import { ref } from "vue"
import SvInputText from '@/components/primevue-wrappers/SvInputText.vue';
import SvPassword from "@/components/primevue-wrappers/SvPassword.vue";
import SvButton from '@/components/primevue-wrappers/SvButton.vue';
import SvCard from '@/components/primevue-wrappers/SvCard.vue';
import SvField from "@/components/SvField/SvField.vue";
import SvProductTitle from "@/components/SvProductTitle/SvProductTitle.vue";
import SvThemeSelector from "@/components/SvThemeSelector/SvThemeSelector.vue";
import SvLangSelector from "@/components/SvLangSelector/SvLangSelector.vue";
import { useNotification } from "@/use/useNotification";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import useAuthStore from "@/store/auth"
import useAfterAuthorize from "@/use/useAfterAuthorize"

type IProps = {
  returnUrl: string,
  preserveReturnUrl: boolean,
}

const toast = useNotification();
const { t } = useI18n();
const router = useRouter();

const props = withDefaults(defineProps<IProps>(), {
  returnUrl: '',
  preserveReturnUrl: false
})

const email = ref('')
const password = ref('')
const loading = ref(false)

const { redirectToDesiredPage, handleReturnUrl } = useAfterAuthorize();

if (!props.preserveReturnUrl) {
  handleReturnUrl(props.returnUrl);
}

const login = async () => {
  const authStore = useAuthStore()
  try {
    loading.value = true;
    await authStore.dispatchLogin(email.value, password.value);
    redirectToDesiredPage();
  } catch (error) {
    toast.error(t('Auth.notifications.incorrectAuth'));
  } finally {
    loading.value = false
  }
}

const toChangePassword = () => {
  router.push({ name: "ChangePassword" });
}
const toLoginAd = () => {
  router.push({ name: "LoginAd" });
}
</script>

<template>
  <div id="svyazcom-app" class="layout flex align-items-center justify-content-center">
    <SvCard class="layout-body pb-2">
        <div class="flex justify-content-between">
          <SvThemeSelector />
          <SvLangSelector />
        </div>
        <div class="flex justify-content-center py-4">
          <SvProductTitle xl inverse></SvProductTitle>
        </div>
        <SvField :label="$t('Common.fields.loginEmail')" class="pb-4">
          <SvInputText v-model="email" />
        </SvField>
        <SvField :label="$t('Common.fields.password')" class="pb-5">
          <SvPassword v-model="password" :feedback="false" toggleMask />
        </SvField>
        <div class="flex justify-content-center pb-3">
          <SvButton class="w-full" :label="$t('Auth.buttons.signIn')"
            :loading="loading" @click="login" />
        </div>
        <div class="flex justify-content-center pb-3">
          <SvButton text :label="$t('Auth.buttons.signInWithOsAccount')" @click="toLoginAd" />
        </div>
        <div class="flex justify-content-center">
          <SvButton text :label="$t('Auth.buttons.forgotPassword')" @click="toChangePassword"/>
        </div>
    </SvCard>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #2194f2;
  background-image:
    radial-gradient(at 62% 25%, #75cfff 0px, transparent 50%),
    radial-gradient(at 81% 8%, #2594d0 0px, transparent 50%),
    radial-gradient(at 86% 88%, #3874f5 0px, transparent 50%),
    radial-gradient(at 25% 58%, #0c55ca 0px, transparent 50%),
    radial-gradient(at 90% 28%, #70cdff 0px, transparent 50%),
    radial-gradient(at 46% 99%, #3a87f2 0px, transparent 50%),
    radial-gradient(at 19% 54%, #0c55ca 0px, transparent 50%);


  .layout-body {
    max-width: 380px;
    overflow: auto;
  }
}
</style>