import { StoryFn, Meta } from "@storybook/vue3";
import SvCardDialog from "../components/SvCardDialog/SvCardDialog.vue";
import SvInputText from "../components/primevue-wrappers/SvInputText.vue";
import {SvButton} from "../index";


export default {
    title: "Form/SvCardDialog",
    component: SvCardDialog,
    argTypes: {

    }
} as Meta<typeof SvCardDialog>;

const Template: StoryFn<typeof SvCardDialog> = (args) => ({
    components: { SvCardDialog, SvInputText, SvButton},
    setup() {
        return { args, SvInputText };
    },
    template: `
    <div class="col-4">
      <SvCardDialog v-bind="args">
        <div class="grid">
          <div class="col-6" v-for="i in Array(6).keys()">
            <div class="mb-2">Label</div>
            <SvInputText class="w-full" :value="123" />
          </div>
        </div>
        <template #activator="{onOpenDialog}">
          <SvButton @click="onOpenDialog">
            Dialog window open
          </SvButton>
        </template>
        <template #subtitle>
          Подзаголовок
        </template>
        <template #title>
          Заголовок
        </template>
      </SvCardDialog>
    </div>
    `,
});

export const Default: StoryFn<typeof SvCardDialog> = Template.bind({});

Default.args = {

};