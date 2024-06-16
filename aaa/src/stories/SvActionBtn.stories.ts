import { StoryFn, Meta } from '@storybook/vue3';
import SvActionBtn from '../components/SvActionBtn/SvActionBtn.vue'


export default {
    title: 'Form/SvActionBtn',
    component: SvActionBtn,
    argTypes: {}
} as Meta<typeof SvActionBtn>;

const Template: StoryFn<typeof SvActionBtn> = (args) => ({
    components: { SvActionBtn },
    setup() {
        return { args };
    },
    template: `<SvActionBtn v-bind="args" />`,
});

export const Default: StoryFn<typeof SvActionBtn> = Template.bind({})

Default.args = {
    icon: "pi pi-bars",
    items: [
        {
            label: 'Documents',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-plus'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-search'
                }
            ]
        },
        {
            label: 'Profile',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-cog'
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out'
                }
            ]
        }
    ]
}