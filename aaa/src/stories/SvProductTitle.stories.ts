import { StoryFn, Meta } from '@storybook/vue3';
import SvProductTitle from '../components/SvProductTitle/SvProductTitle.vue'
import {IProps} from "../components/SvProductTitle/SvProductTitle.types";

export default {
    title: 'Form/SvProductTitle',
    component: SvProductTitle,
    argTypes: {
        title: true
    }
} as Meta<typeof SvProductTitle>;

const Template: StoryFn<typeof SvProductTitle> = (args) => ({
    components: { SvProductTitle },
    setup() {
        return { args };
    },
    template: `<SvProductTitle v-bind="args" />`,
});

export const Default: StoryFn<typeof SvProductTitle> = Template.bind({})

Default.args = {
    logoPath: "123",
    title: "123"
} as IProps