import { StoryFn, Meta } from "@storybook/vue3";
import Layout from "../pages/Layout.vue";
import SvPage from "../components/SvPage/SvPage.vue";
import {useContextManager} from "../plugins/contextManager";

export default {
    title: "Stories/Layout",
    component: Layout,
    argTypes: {}
} as Meta<typeof Layout>;

const Template: StoryFn<typeof Layout> = (args) => ({
    components: { Layout, SvPage },
    setup() {
        useContextManager().router().push({"name": "Users"});
        
        return { args };
    },
    template: "<div style=\"margin: -1rem;\"><Layout v-bind=\"args\"><SvPage title=\"title\">11111111111111111111111111111111</SvPage></Layout></div>",
});

export const Default: StoryFn<typeof Layout> = Template.bind({});

Default.args = {
};