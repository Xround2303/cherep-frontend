import { StoryFn, Meta } from '@storybook/vue3';
import SvPage from '../components/SvPage/SvPage.vue'


export default {
    title: 'Form/SvPage',
    component: SvPage,
    argTypes: {
        title: {
            control: "text"
        }
    }
} as Meta<typeof SvPage>;

const Template: StoryFn<typeof SvPage> = (args) => ({
    components: { SvPage },
    setup() {
        return { args };
    },
    template: `<SvPage v-bind="args">content</SvPage>`,
});

export const Default: StoryFn<typeof SvPage> = Template.bind({})

Default.args = {
    title: "test"
}