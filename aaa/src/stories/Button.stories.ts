import { StoryFn, Meta } from '@storybook/vue3';
import SvButton from '../components/primevue-wrappers/SvButton.vue'

export default {
    title: 'Form/Button',
    component: SvButton,
    argTypes: {
        iconPos: {
            control: "select",
            options: [
                "right",
                "left"
            ]
        },
        disabled: {
            control: "boolean",
        },
        rounded: {
            control: "boolean",
        },
        outlined: {
            control: "boolean",
        },
        raised: {
            control: "boolean",
        },
        text: {
            control: "boolean",
        },
        badge: {
            control: "number"
        },
        icon: {
            control: "text"
        },
        size: {
            control: "select",
            options: [
                "small",
                "large",
                null
            ]
        },
        label: {
            control: "text"
        }
    }
} as Meta<typeof SvButton>;

const Template: StoryFn<typeof SvButton> = (args) => ({
    components: { SvButton },
    setup() {
        return { args };
    },
    template: `<SvButton v-bind="args" />`,
});

export const Default: StoryFn<typeof SvButton> = Template.bind({})

Default.args = {
    label: "test"
}