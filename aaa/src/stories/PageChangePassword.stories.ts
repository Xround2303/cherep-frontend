import { StoryFn, Meta } from "@storybook/vue3";
import PageChangePassword from "../pages/Auth/ChangePassword.vue";


export default {
    title: "Pages/ChangePassword",
    component: PageChangePassword,
    argTypes: {}
} as Meta<typeof PageChangePassword>;

const Template: StoryFn<typeof PageChangePassword> = (args) => ({
    components: { PageChangePassword },
    setup() {
        return { args };
    },
    template: "<PageChangePassword v-bind=\"args\" />",
});

export const Default: StoryFn<typeof PageChangePassword> = Template.bind({});

Default.args = {
};