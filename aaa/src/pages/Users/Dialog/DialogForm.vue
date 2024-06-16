<template>
  <SvCardDialog
    ref="nodeDialog"
    :width="'500px'"
  >
    <template #title>
      {{ title }}
    </template>

    <div class="pb-3">
      <template v-if="!store.isLoadingDataForm">
        <div class="mb-3">
          <SvField
            v-slot="{invalid}"
            :error-messages="store.errors.email"
            :label="'Email (login)'"
            :required="true"
          >
            <SvInputText
              :invalid="invalid"
              :value="store.email"
              class="w-full"
              @input="store.mutatorEmail($event.target.value)"
            />
          </SvField>
        </div>
        <div class="grid mb-3">
          <div class="col-6">
            <SvField :label="'Имя'">
              <SvInputText
                :value="store.firstName"
                class="w-full"
                @input="store.mutatorFirstName($event.target.value)"
              />
            </SvField>
          </div>
          <div class="col-6">
            <SvField :label="'Отчество'">
              <SvInputText
                :value="store.surname"
                class="w-full"
                @input="store.mutatorSurname($event.target.value)"
              />
            </SvField>
          </div>
        </div>
        <div class="mb-3">
          <SvField
            v-slot="{invalid}"
            :error-messages="store.errors.lastName"
            :label="'Фамилия'"
          >
            <SvInputText
              :invalid="invalid"
              :value="store.lastName"
              class="w-full"
              @input="store.mutatorLastName($event.target.value)"
            />
          </SvField>
        </div>
        <div class="mb-3">
          <SvField
            :error-messages="store.errors.password"
            label="Пароль"
          >
            <SvPassword
              :feedback="false"
              :model-value="store.password"
              class="w-full"
              toggle-mask
              @input="store.mutatorPassword($event.target.value)"
            />
          </SvField>
        </div>
        <div class="mb-3">
          <label class="flex align-items-center cursor-pointer">
            <SvCheckbox
              :model-value="store.resetPassword"
              binary
              class="mr-2"
              @update:model-value="store.mutatorResetPassword($event)"
            />
            Переодическая смена пароля
          </label>
        </div>
        <div class="grid mb-3">
          <div class="col-6">
            <SvField
              :error-messages="store.errors.resetPasswordInterval"
              label="Период смены пароля (дни)"
            >
              <SvInputNumber
                :disabled="!store.resetPassword"
                :value="store.resetPasswordInterval"
                class="w-full"
                @input="store.mutatorResetPasswordInterval($event.target.value)"
              />
            </SvField>
          </div>
        </div>

        <div class="mb-3">
          <SvField
            :error-messages="store.errors.roles"
            label="Роли"
          >
            <SvMultiSelect
              :model-value="rolesValue"
              :options="roles"
              :show-toggle-all="false"
              class="w-full"
              display="chip"
              option-label="name"
              placeholder="Выбрать роль"
              @change="store.mutatorRoles($event.value.map((item) => item.code))"
            />
          </SvField>
        </div>
        <div class="mb-3">
          <SvField
            :error-messages="store.errors.timezone"
            label="Часовой пояс"
          >
            <SvDropdown
              :model-value="store.timezone"
              :option-label="'name'"
              :option-value="'code'"
              :options="timezones"
              class="w-full"
              @update:model-value="store.mutatorTimezone($event)"
            />
          </SvField>
        </div>
        <div class="mb-3">
          <label class="flex align-items-center cursor-pointer">
            <SvCheckbox
              :model-value="store.onlyOneDevice"
              binary
              class="mr-2"
              @update:model-value="store.mutatorOnlyOneDevice($event)"
            />
            Только одно авторизованное устройство
          </label>
        </div>
        <div v-if="isEdit">
          <label class="flex align-items-center cursor-pointer">
            <SvCheckbox
              :model-value="store.userBlocked"
              binary
              class="mr-2"
              @update:model-value="store.mutatorUserBlocked($event)"
            />
            Заблокировать пользователя
          </label>
        </div>
      </template>
      <template v-else>
        <div
          class="flex align-items-center justify-content-center"
          style="height: 450px;"
        >
          <SvProgressSpinner />
        </div>
      </template>
    </div>

    <template #footer="{onCloseDialog}">
      <div class="flex justify-content-end">
        <SvButton
          :outlined="true"
          label="Отменить"
          @click="onCloseDialog"
        />
        <SvButton
          :disabled="!store.meta.valid"
          :loading="store.isLoadSaveForm"
          class="ml-2"
          label="Сохранить"
          @click="emits('save', 123, onCloseDialog)"
        />
      </div>
    </template>
  </SvCardDialog>
</template>
<script lang="ts" setup>
import SvCardDialog from "@/components/SvCardDialog/SvCardDialog.vue";
import SvField from "@/components/SvField/SvField.vue";
import SvInputText from "@/components/primevue-wrappers/SvInputText.vue";
import SvPassword from "@/components/primevue-wrappers/SvPassword.vue";
import useStore from "@/store/users/UserEdit";
import SvProgressSpinner from "@/components/primevue-wrappers/SvProgressSpinner.vue";
import SvMultiSelect from "@/components/primevue-wrappers/SvMultiSelect.vue";
import {computed, ref} from "vue";
import SvCheckbox from "@/components/primevue-wrappers/SvCheckbox.vue";
import SvDropdown from "@/components/primevue-wrappers/SvDropdown.vue";
import SvButton from "@/components/primevue-wrappers/SvButton.vue";
import {IProps} from "./DialogForm.types";
import {DicRoleItem} from "@/use/useDictionary.types";
import {useDictionary} from "@/use/useDictionary";
import SvInputNumber from "@/components/primevue-wrappers/SvInputNumber.vue";

const store = useStore();

withDefaults(defineProps<IProps>(), {
  isEdit: false
});
const nodeDialog = ref<InstanceType<typeof SvCardDialog> | null>(null);

const emits = defineEmits(["save"]);
const dictionary = useDictionary("Roles");
const rolesDictionary = dictionary.getDic<DicRoleItem[]>("Roles");

const roles = computed(() => {

  if (!rolesDictionary?.value) {
    return [];
  }

  return rolesDictionary?.value.map(item => ({
    code: item.id,
    name: item.term,
  }));
});

const timezones = [
  {
    name: "Asia/Krasnoyarsk",
    code: "Asia/Krasnoyarsk"
  },
];

const rolesValue = computed(() => {
  return roles.value.filter(role => {
    return !!store.roles?.find((code: string) => code === role.code);
  });
});

const open = () => {
  nodeDialog.value?.onOpenDialog();
};

defineExpose({
  open
});


</script>