import { StoryFn, Meta } from '@storybook/vue3';
import SvBreadcrumbs from '../components/SvBreadcrumbs/SvBreadcrumbs.vue'

export default {
    title: 'Form/SvBreadcrumbs',
    component: SvBreadcrumbs,
    argTypes: {
    }
} as Meta<typeof SvBreadcrumbs>;

const Template: StoryFn<typeof SvBreadcrumbs> = (args) => ({
    components: { SvBreadcrumbs },
    setup() {
        return { args };
    },
    template: `<SvBreadcrumbs v-bind="args">Подсказка</SvBreadcrumbs>`,
});

export const Default: StoryFn<typeof SvBreadcrumbs> = Template.bind({})

Default.args = {
    items: [
        {
            label: "Breadcrumb"
        },
        {
            label: "Breadcrumb"
        },
        {
            label: "Breadcrumb"
        },
        {
            label: "Breadcrumb"
        },
        {
            label: "Breadcrumb"
        },
    ]
}