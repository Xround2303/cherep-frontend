
import {Meta, StoryFn} from "@storybook/vue3";
import SvTable from "../components/SvTable/SvTable.vue";
import SvDataTable from "../components/SvTable/SvDataTable.vue";
import {SvInputText} from "../index";
import usersStore from "../store/users/Table";
import {TRow} from "../store/users/Table.types";
import storeUserHistory from "../store/userHistory/Table";
import SvTag from "../components/primevue-wrappers/SvTag.vue";
import SvButton from "../components/primevue-wrappers/SvButton.vue";
import SvTagSelector from "../components/SvTagSelector/SvTagSelector.vue";
import {Severity} from "../components/SvTagSelector/SvTagSelector.types";
import SvCardDialog from "../components/SvCardDialog/SvCardDialog.vue";
import {useConfirm} from "primevue/useconfirm";
import ConfirmDialog from "../components/primevue-wrappers/SvConfirmDialog.vue";

const meta =  {
    title: "Form/SvTable",
    component: SvTable,
    argTypes: {
        sortMode: {
            control: "select",
            options: [
                "single",
                "multiple"
            ]
        }
    }
} as Meta<typeof SvTable<TRow>>;

export default meta;


const Template: StoryFn<typeof SvTable<TRow>> = (args) => ({
    components: {
        SvTable,
        SvDataTable,
        SvInputText,
        SvTag,
        SvTagSelector,
        SvButton,
        SvCardDialog,
        ConfirmDialog
    },
    setup() {
        const roles = [
            {
                id: 1,
                value: "Администратор",
                severity: Severity.contrast
            },
            {
                id: 2,
                value: "Администратор",
                severity: Severity.contrast
            },
            {
                id: 3,
                value: "Администратор",
                severity: Severity.contrast
            }
        ];

        const confirm = useConfirm();

        const onShowUserHistory = (body, onOpenDialog) => {
            storeUserHistory.mutatorItemId(body.data.id);
            onOpenDialog();
        };

        const onTableDeleteRow = (acceptCallback) => {
            confirm.require({
                message: "Are you sure you want to proceed?",
                header: "Confirmation",
                icon: "pi pi-exclamation-triangle",
                rejectClass: "p-button-secondary p-button-outlined",
                rejectLabel: "Cancel",
                acceptLabel: "Save",
                accept: () => {
                    acceptCallback();
                },
                reject: () => {
                }
            });
        };

        return {
            args,
            usersStore,
            storeUserHistory,
            roles,
            onShowUserHistory,
            onTableDeleteRow
        } ;
    },
    template: `
      <div class="p-5" style="background: var(--surface-card); border-radius: 10px">
        <ConfirmDialog />
        <SvTable v-bind="args" :store="usersStore" :with-filter="true" :with-paginator="true" :with-drag-and-drop="true">
          <template #editor.item.fio="{ body, value }">
            <SvInputText v-model="body.data.fio" />
          </template>
          <template #item.role="{ body }">
            <SvTagSelector
              :rounded="true"
              :readonly="true"
              :items="roles"
              :model-value="body.data.role"
            />
          </template>
          <template #item.active="{ body }">
            <i class="pi pi-check" v-if="body.data.active"></i>
            <i class="pi pi-minus" v-else></i>
          </template>
          <template #item.active_directory="{ body }">
            <i class="pi pi-check" v-if="body.data.active_directory"></i>
            <i class="pi pi-minus" v-else></i>
          </template>
          <template #editor.item.role="{ body }">
            <SvTagSelector
              :rounded="true"
              :items="roles"
              v-model="body.data.role"
            />
          </template>
          <template #actions="{ body, onDeleteRow, toEdit, onEditCancel, onEditSave, editingRows }">
            <template v-if="editingRows.map(item => item.id).includes(body.data.id)">
              <SvButton
                text
                type="button"
                icon="pi pi-check"
                rounded
                class="mr-2"
                @click="onEditSave(body.data)"
              />
              <SvButton
                text
                type="button"
                icon="pi pi-times"
                rounded
                class="mr-2"
                @click="onEditCancel(body.data)"
              />
            </template>
            <SvButton
              text
              type="button"
              icon="pi pi-pencil"
              rounded
              class="mr-2"
              @click="toEdit(body.data)"
              v-else
            />
            <SvButton
              text
              type="button"
              icon="pi pi-trash"
              rounded
              @click="onTableDeleteRow(() => onDeleteRow($event, body.data))"
            />
            <SvCardDialog >
              <template #activator="{onOpenDialog}">
                <SvButton
                  text
                  type="button"
                  icon="pi pi-history"
                  rounded
                  @click="onShowUserHistory(body, onOpenDialog)"
                />
              </template>
              <template #title>
                История изменений
              </template>
              <SvTable
                :with-paginator="true"
                :with-filter="true"
                :store="storeUserHistory"
              >
                <template #expansion="{body}">
                  <SvDataTable
                    v-if="body.data.expanded?.length > 0"
                    :headers="storeUserHistory.expandedHeaders"
                    :rows="body.data.expanded"
                  />
                  <div v-else>Нет данных</div>
                </template>
              </SvTable>
            </SvCardDialog>
          </template>
        </SvTable>
      </div>
    `,
});

export const Default: StoryFn<typeof SvTable> = Template.bind({});

Default.args = {
    withDragAndDrop: true,
    sortMode: "multiple"
};