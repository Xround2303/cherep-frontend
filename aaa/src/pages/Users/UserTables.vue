<script lang="ts" setup>
import SvTable from "@/components/SvTable/SvTable.vue";
import usersStore from "@/store/users/Table";
import SvButton from "@/components/primevue-wrappers/SvButton.vue";
import {IOnTableDeleteRow} from "./UserTables.types";
import ConfirmDialog from "@/components/primevue-wrappers/SvConfirmDialog.vue";
import DialogEdit from "@/pages/Users/Dialog/DialogEdit.vue";
import DialogUserHistory from "@/pages/Users/DialogUserHistory.vue";
import DialogCreate from "@/pages/Users/Dialog/DialogCreate.vue";
import {ref} from "vue";
import SvPage from "@/components/SvPage/SvPage.vue";
import {useConfirm} from "primevue/useconfirm";
import SvTag from "@/components/primevue-wrappers/SvTag.vue";

const confirm = useConfirm();
const nodeDialogUserHistory = ref<InstanceType<typeof DialogUserHistory> | null>(null);
const nodeDialogEdit = ref<InstanceType<typeof DialogEdit> | null>(null);
const nodeDialogCreate = ref<InstanceType<typeof DialogCreate> | null>(null);


const onTableDeleteRow: IOnTableDeleteRow = (acceptCallback) => {
  confirm.require({
    message: "Вы действительно хотите удалить запись?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "p-button-secondary p-button-outlined",
    rejectLabel: "Отменить",
    acceptLabel: "Удалить",
    accept: () => acceptCallback(),
    reject: () => {
    }
  });
};

const onOpenEdit = (userId: number) => {
  nodeDialogEdit.value?.open(userId);
};
const onOpenCreate = (userId: number) => {
  nodeDialogCreate.value?.open();
};
const onOpenHistory = (userId: number) => {
  nodeDialogUserHistory.value?.open(userId);
};

</script>
<template>
  <SvPage :title="'Пользователи'">
    <ConfirmDialog />
    <DialogEdit ref="nodeDialogEdit" />
    <DialogCreate ref="nodeDialogCreate" />
    <DialogUserHistory ref="nodeDialogUserHistory" />
    <SvTable
      :store="usersStore"
      :with-drag-and-drop="true"
      :with-filter="true"
      :with-paginator="true"
    >
      <template #before-search>
        <SvButton
          class="mr-2"
          label="Создать пользователя"
          @click="onOpenCreate"
        />
      </template>
      <template #[`item.roles`]="{ body }">
        <SvTag
          v-for="role of body.data.roles"
          :key="role"
          :outline="true"
          :rounded="true"
          :value="role"
          class="mr-2"
          severity="contrast"
        />
      </template>
      <template #[`item.active`]="{ body }">
        <i
          v-if="body.data.active"
          class="pi pi-check"
        />
        <i
          v-else
          class="pi pi-minus"
        />
      </template>
      <template #[`item.is_ldap`]="{ body }">
        <i
          v-if="body.data.is_ldap"
          class="pi pi-check"
        />
        <i
          v-else
          class="pi pi-minus"
        />
      </template>
      <template #actions="{ body, onDeleteRow }">
        <SvButton
          icon="pi pi-pencil"
          rounded
          text
          type="button"
          @click="() => onOpenEdit(body.data.id)"
        />
        <SvButton
          icon="pi pi-trash"
          rounded
          text
          type="button"
          @click="onTableDeleteRow(() => onDeleteRow(body.data))"
        />
        <SvButton
          icon="pi pi-history"
          rounded
          text
          type="button"
          @click="() => onOpenHistory(body.data.id)"
        />
      </template>
    </SvTable>
  </SvPage>
</template>