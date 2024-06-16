import { StoryFn, Meta } from '@storybook/vue3';
import SvDropUploader from '../components/SvDropUploader/SvDropUploader.vue'


export default {
    title: 'Form/SvDropUploader',
    component: SvDropUploader,
    argTypes: {
    }
} as Meta<typeof SvDropUploader>;

const Template: StoryFn<typeof SvDropUploader> = (args) => ({
    components: { SvDropUploader },
    setup() {
        return { args };
    },
    template: `<SvDropUploader v-bind="args" />`,
});

export const Default: StoryFn<typeof SvDropUploader> = Template.bind({})

Default.args = {
}