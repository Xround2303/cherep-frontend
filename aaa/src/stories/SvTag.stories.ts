import { StoryFn, Meta } from '@storybook/vue3';
import SvTag from '../components/primevue-wrappers/SvTag.vue'


export default {
    title: 'Form/SvTag',
    component: SvTag,
    argTypes: {

    }
} as Meta<typeof SvTag>;

const Template: StoryFn<typeof SvTag> = (args) => ({
    components: { SvTag },
    setup() {
        return { args };
    },
    template: `<SvTag v-bind="args" />`,
});

export const Default: StoryFn<typeof SvTag> = Template.bind({})

Default.args = {
    value: "Текст",
    rounded: true,
    outline: true,
    severity: "warning"
}