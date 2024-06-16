import { StoryFn, Meta } from '@storybook/vue3';
import SvMessage from '../components/primevue-wrappers/SvMessage.vue'


export default {
    title: 'Form/SvMessage',
    component: SvMessage,
    argTypes: {

    }
} as Meta<typeof SvMessage>;

const Template: StoryFn<typeof SvMessage> = (args) => ({
    components: { SvMessage },
    setup() {
        return { args };
    },
    template: `<SvMessage v-bind="args">
      Message Content
    </SvMessage>`,
});

export const Default: StoryFn<typeof SvMessage> = Template.bind({})

Default.args = {

}