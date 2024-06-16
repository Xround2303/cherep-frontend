import {Meta, StoryFn} from "@storybook/vue3";
import SvTagSelector, {type IProps} from "../components/SvTagSelector/SvTagSelector.vue";
import {Severity} from "../components/SvTagSelector/SvTagSelector.types";
import {ref} from "vue";

const meta =  {
    title: "Form/SvTagSelector",
    component: SvTagSelector,
    parameters:{
        controls:{
            exclude: [
                "modelValue",
                "update:modelValue"
            ]
        }
    },
    argTypes: {
        items: {
            control: "object"
        },
    }
} as Meta<typeof SvTagSelector>;


export default meta;


const Template: StoryFn<typeof SvTagSelector> = (args) => ({
    components: { SvTagSelector },
    setup() {
        const model = ref(null);
        const onModelUpdate = (event) => model.value = event;

        return { args, model, onModelUpdate };
    },
    template: `<SvTagSelector 
        v-bind="args" 
        :model-value="model"
        @update:model-value="onModelUpdate" 
    />`,
});

export const Default: StoryFn<typeof SvTagSelector> = Template.bind({});

Default.args = {
    items: [
        {
            id: 1,
            value: "Первый элемент",
            severity: Severity.success
        },
        {
            id: 2,
            value: "Второй элемент",
            severity: Severity.secondary
        }

    ]
};