import { StoryFn, Meta } from "@storybook/vue3";
import SvTableOption from "../components/SvTable/SvTableOption.vue";
import store from "../store/users/Table";
import {onMounted} from "vue";


export default {
    title: "Form/SvTableOption",
    component: SvTableOption,
    argTypes: {
    }
} as Meta<typeof SvTableOption>;

const Template: StoryFn<typeof SvTableOption> = (args) => ({
    components: { SvTableOption },
    setup() {

        onMounted(async () => store.onUpdateHeaders());

        return { args, store };
    },
    template: `<SvTableOption 
      :headers="store.headers.value"
      :headers-default="store.headersDefault"
      v-bind="args"
    />`,
});

export const Default: StoryFn<typeof SvTableOption> = Template.bind({});

Default.args = {

};