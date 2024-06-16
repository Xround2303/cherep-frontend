import { StoryFn, Meta } from '@storybook/vue3';
import SvFooter from '../components/SvFooter/SvFooter.vue'


export default {
    title: 'Form/SvFooter',
    component: SvFooter,
    argTypes: {
    }
} as Meta<typeof SvFooter>;

const Template: StoryFn<typeof SvFooter> = (args) => ({
    components: { SvFooter },
    setup() {
        return { args };
    },
    template: `<SvFooter v-bind="args" />`,
});

export const Default: StoryFn<typeof SvFooter> = Template.bind({})

Default.args = {
}