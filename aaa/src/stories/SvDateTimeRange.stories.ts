import { StoryFn, Meta } from '@storybook/vue3';
import SvDateTimeRange from '../components/SvDateTimeRange/SvDateTimeRange.vue';


export default {
    title: 'Form/SvDateTimeRange',
    component: SvDateTimeRange,
    argTypes: {
    }
} as Meta<typeof SvDateTimeRange>;

const Template: StoryFn<typeof SvDateTimeRange> = (args) => ({
    components: { SvDateTimeRange },
    setup() {
        return { args };
    },
    template: `<SvDateTimeRange v-bind="args" />`,
});

export const Default: StoryFn<typeof SvDateTimeRange> = Template.bind({})

Default.args = {
}