<template>
  <SvCardDialog
    ref="nodeDialog"
    :is-show-footer="false"
  >
    <template #title>
      История изменений
    </template>
    <SvTable
      :height="'500px'"
      :with-paginator="true"
      :with-filter="true"
      :store="storeUserHistory"
    >
      <template #expansion="{ body }">
        <SvDataTable
          v-if="body.data?.expanded && body.data?.expanded?.length > 0"
          :headers="storeUserHistory.expandedHeaders"
          :rows="body.data?.expanded ?? []"
        />
        <div v-else>
          Нет данных
        </div>
      </template>
    </SvTable>
  </SvCardDialog>
</template>
<script lang="ts" setup>
import storeUserHistory from "@/store/userHistory/Table";
import SvCardDialog from "@/components/SvCardDialog/SvCardDialog.vue";
import SvTable from "@/components/SvTable/SvTable.vue";
import {IOnShowUserHistory} from "@/pages/Users/DialogUserHistory.types";
import {ref} from "vue";
import SvDataTable from "@/components/SvTable/SvDataTable.vue";
const nodeDialog = ref<InstanceType<typeof SvCardDialog> | null>(null);

const open: IOnShowUserHistory = (userId) => {
  storeUserHistory.mutatorItemId(userId);
  nodeDialog.value?.onOpenDialog();
};

defineExpose({
  open
});

</script>