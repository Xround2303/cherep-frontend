import { StoryFn, Meta } from '@storybook/vue3';
import SvPassword from '../components/primevue-wrappers/SvPassword.vue';
import {ref} from "vue";


export default {
    title: 'Form/SvPassword',
    component: SvPassword,
    argTypes: {
    }
} as Meta<typeof SvPassword>;

const Template: StoryFn<typeof SvPassword> = (args) => ({
    components: { SvPassword },
    setup() {

        const value = ref("");

        return { args, value };
    },
    template: `<SvPassword v-bind="args" v-model="value" />`,
});

export const Default: StoryFn<typeof SvPassword> = Template.bind({})

Default.args = {
    toggleMask: true
}