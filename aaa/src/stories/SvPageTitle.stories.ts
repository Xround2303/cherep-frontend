import { StoryFn, Meta } from '@storybook/vue3';
import SvPageTitle from '../components/SvPageTitle/SvPageTitle.vue'


export default {
    title: 'Form/SvPageTitle',
    component: SvPageTitle,
    argTypes: {
        title: {
            control: "text"
        }
    }
} as Meta<typeof SvPageTitle>;

const Template: StoryFn<typeof SvPageTitle> = (args) => ({
    components: { SvPageTitle },
    setup() {
        return { args };
    },
    template: `<SvPageTitle v-bind="args" />`,
});

export const Default: StoryFn<typeof SvPageTitle> = Template.bind({})

Default.args = {
    title: "test"
}