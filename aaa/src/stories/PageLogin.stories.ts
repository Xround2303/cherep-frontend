import { StoryFn, Meta } from "@storybook/vue3";
import PageLogin from "../pages/Auth/Login.vue";


export default {
    title: "Pages/Login",
    component: PageLogin,
    argTypes: {}
} as Meta<typeof PageLogin>;

const Template: StoryFn<typeof PageLogin> = (args) => ({
    components: { PageLogin },
    setup() {
        return { args };
    },
    template: "<PageLogin v-bind=\"args\" />",
});

export const Default: StoryFn<typeof PageLogin> = Template.bind({});

Default.args = {
};