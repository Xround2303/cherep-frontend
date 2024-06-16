<script setup lang="ts">
import { ref } from "vue"
import SvPassword from "@/components/primevue-wrappers/SvPassword.vue";
import SvButton from '@/components/primevue-wrappers/SvButton.vue';
import SvCard from '@/components/primevue-wrappers/SvCard.vue';
import SvField from "@/components/SvField/SvField.vue";
import SvProductTitle from "@/components/SvProductTitle/SvProductTitle.vue";
import SvThemeSelector from "@/components/SvThemeSelector/SvThemeSelector.vue";
import SvLangSelector from "@/components/SvLangSelector/SvLangSelector.vue";
import useAuthStore from "@/store/auth"
import useAfterAuthorize from "@/use/useAfterAuthorize"

// type IProps = {
//   returnUrl: string,
//   preserveReturnUrl: boolean,
// }

// const props = withDefaults(defineProps<IProps>(), {
//   returnUrl: '',
//   preserveReturnUrl: false
// })

const newPassword = ref('')
const oldPassword = ref('')
const loading = ref(false)

const { redirectToDesiredPage, handleReturnUrl } = useAfterAuthorize();


const change = async () => {
  //const authStore = useAuthStore()
  try {
     loading.value = true
    // await authStore.dispatchLogin(email.value, password.value)
    // redirectToDesiredPage()
  } catch (error) {
    // TODO: send notification error
   /// console.info("TODO: login or password incorrect")
  } finally {
    loading.value = false
  }
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
        <div class="flex justify-content-center pb-3">
          <span class="text-xl-semibold-lineheight-150">{{$t('ChangePassword.fields.changePassword')}}</span>
        </div>
        <SvField :label="$t('Common.fields.newPassword')" class="pb-3">
          <SvPassword v-model="newPassword" toggleMask />
        </SvField>
        <SvField :label="$t('Common.fields.confirmPassword')" class="pb-5">
          <SvPassword v-model="oldPassword" :feedback="false" toggleMask />
        </SvField>
        <div class="flex justify-content-center pb-3">
          <SvButton class="w-full" :label="$t('Common.buttons.save')"
            :loading="loading" @click="change" />
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