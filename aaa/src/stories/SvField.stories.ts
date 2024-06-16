import { StoryFn, Meta } from "@storybook/vue3";
import SvField from "../components/SvField/SvField.vue";
import SvInputText from "../components/primevue-wrappers/SvInputText.vue";
import {EnumErrorVisible} from "../components/SvField/SvField.types";


export default {
    title: "Form/SvField",
    component: SvField,
    argTypes: {
        typeErrorVisible: {
            control: "select",
            options: [
                EnumErrorVisible.bottom,
                EnumErrorVisible.label
            ]
        }
    }
} as Meta<typeof SvField>;

const Template: StoryFn<typeof SvField> = (args) => ({
    components: { SvField, SvInputText },
    setup() {
        return { args };
    },
    template: `
        <div class="grid">
          <div class="col-2">
            <SvField v-bind="args">
              <template #default="{ invalid }">
                <SvInputText :invalid="invalid" class="w-full" :value="'value...'" />
              </template>
            </SvField>
          </div>
        </div>
    `,
});

export const Default: StoryFn<typeof SvField> = Template.bind({});

Default.args = {
    label: "Название поля",
    errorMessages: "Значение `Название поля` не корректно",
    hint: "Подсказка какая то очень большая, это текст рыба"
};