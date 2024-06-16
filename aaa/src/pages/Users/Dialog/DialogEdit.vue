<template>
  <DialogForm
    ref="nodeDialog"
    :is-edit="true"
    :title="'Редактировать пользователя'"
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
const userId = ref<number>(null);

const onSave = async (onCloseDialog: () => any) => {
  if (store.isLoadSaveForm) {
    return;
  }

  store.onSaveEdit(userId.value).then(() => {
    usersStore.onUpdateRows();
    onCloseDialog();
  }).catch(e => {
    toast.error(e.response.data.message);
  });
};

const open = (id: number) => {
  userId.value = id;
  store.onLoad(id);
  nodeDialog.value?.open();
};

defineExpose({
  open
});

</script>