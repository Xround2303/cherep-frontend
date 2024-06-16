import { StoryFn, Meta } from "@storybook/vue3";
import PageUsers from "../pages/Users/UserTables.vue";


export default {
    title: "Pages/Users",
    component: PageUsers,
    argTypes: {}
} as Meta<typeof PageUsers>;

const Template: StoryFn<typeof PageUsers> = (args) => ({
    components: { PageUsers },
    setup() {
        return { args };
    },
    template: "<PageUsers v-bind=\"args\" />",
});

export const Default: StoryFn<typeof PageUsers> = Template.bind({});

Default.args = {
};