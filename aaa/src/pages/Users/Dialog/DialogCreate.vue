<template>
  <DialogForm
    ref="nodeDialog"
    :title="'Создание пользователя'"
    @save="onSave"
  />
</template>
<script lang="ts" setup>
import useStore from "@/store/users/UserEdit";
import usersStore from "@/store/users/Table";
import {ref} from "vue";
import DialogForm from "@/pages/Users/Dialog/DialogForm.vue";
import {useNotification} from "@/use/useNotification";

const store = useStore();
const nodeDialog = ref<InstanceType<typeof DialogForm> | null>(null);
const toast = useNotification();
const onSave = async (onCloseDialog: () => any) => {
  if (store.isLoadSaveForm) {
    return;
  }

  store.onCreate()
    .then(e => {
      usersStore.onUpdateRows();
      onCloseDialog();
    })
    .catch(e => {
      toast.error(e.response.data.message);
    });
};

const open = () => {
  store.resetForm();
  nodeDialog.value?.open();
};

defineExpose({
  open
});

</script>