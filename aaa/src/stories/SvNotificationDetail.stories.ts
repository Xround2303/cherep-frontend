import { StoryFn, Meta } from '@storybook/vue3';
import SvNotificationDetail from '../components/SvNotificationDetail/SvNotificationDetail.vue'


export default {
    title: 'Form/SvNotificationDetail',
    component: SvNotificationDetail,
    argTypes: {

    }
} as Meta<typeof SvNotificationDetail>;

const Template: StoryFn<typeof SvNotificationDetail> = (args) => ({
    components: { SvNotificationDetail },
    setup() {
        return { args };
    },
    template: `<SvNotificationDetail v-bind="args" />`,
});

export const Default: StoryFn<typeof SvNotificationDetail> = Template.bind({})

Default.args = {

}