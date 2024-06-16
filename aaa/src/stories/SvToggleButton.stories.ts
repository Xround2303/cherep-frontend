import { StoryFn, Meta } from '@storybook/vue3';
import SvSelectButton from '../components/primevue-wrappers/SvSelectButton.vue';
import {ref} from "vue";


export default {
    title: 'Form/SvSelectButton',
    component: SvSelectButton,
    argTypes: {
    }
} as Meta<typeof SvSelectButton>;

const Template: StoryFn<typeof SvSelectButton> = (args) => ({
    components: { SvSelectButton },
    setup() {

        const value = ref('One-Way');
        const options = ref(['One-Way', 'Return', "test", "test2", "test3"]);
        return {
            args,
            value,
            options,
        };
    },
    template: `<SvSelectButton v-bind="args" v-model="value" :options="options" />`,
});

export const Default: StoryFn<typeof SvSelectButton> = Template.bind({})

Default.args = {
}