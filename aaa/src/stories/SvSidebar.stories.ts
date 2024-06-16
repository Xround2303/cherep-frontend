import { StoryFn, Meta } from '@storybook/vue3';
import SvSidebar from '../components/SvSidebar/SvSidebar.vue'


export default {
    title: 'Form/SvSidebar',
    component: SvSidebar,
    argTypes: {

    }
} as Meta<typeof SvSidebar>;

const Template: StoryFn<typeof SvSidebar> = (args) => ({
    components: { SvSidebar },
    setup() {
        return { args };
    },
    template: `<div style="height: 500px; width: 300px">
      <SvSidebar v-bind="args" />
    </div>`,
});

export const Default: StoryFn<typeof SvSidebar> = Template.bind({})

Default.args = {
    items: [
        {
            reference_name: "ref-admin",
            icon: "mdi-cog",
            children: [
                {
                    reference_name: "ref-users",
                    workplace: "Test"
                },
                {
                    reference_name: "ref-roles",
                    workplace: "Test"
                },
                {
                    reference_name: "ref-history-actions",
                    children: [
                        {
                            reference_name: "ref-users",
                            workplace: "Test"
                        },
                        {
                            reference_name: "ref-roles",
                            workplace: "Test"
                        },
                        {
                            reference_name: "ref-history-actions",
                            workplace: "Test"
                        }
                    ]
                }
            ]
        },
    ]
}