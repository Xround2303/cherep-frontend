<template>
  <SvCardDialog>
    <template #activator="{onOpenDialog}">
      <SvButton @click="onOpenDialog">
        Dialog window open
      </SvButton>
    </template>
    <template #title>
      История изменений
    </template>
    <SvTable
      :with-paginator="true"
      :with-filter="true"
      :store="store"
    >
      <template #expansion="{body}">
        <SvDataTable
          v-if="body.data?.expanded && body.data.expanded?.length > 0"
          :headers="store.expandedHeaders"
          :rows="body.data.expanded"
        />
        <div v-else>
          Нет данных
        </div>
      </template>
    </SvTable>
  </SvCardDialog>
</template>

<script setup lang="ts">
import SvTable from "../SvTable/SvTable.vue";
import SvCardDialog from "../SvCardDialog/SvCardDialog.vue";
import store from "../../store/userHistory/Table";
import SvDataTable from "../SvTable/SvDataTable.vue";
import {IProps} from "./SvShowHistoryModal.types";
import SvButton from "@/components/primevue-wrappers/SvButton.vue";

defineProps<IProps>();

</script>