import { StoryFn, Meta } from '@storybook/vue3';
import SvHint from '../components/SvHint/SvHint.vue'


export default {
    title: 'Form/SvHint',
    component: SvHint,
    argTypes: {
        text: {
            control: "text"
        }
    }
} as Meta<typeof SvHint>;

const Template: StoryFn<typeof SvHint> = (args) => ({
    components: { SvHint },
    setup() {
        return { args };
    },
    template: `<SvHint v-bind="args">
      {{args.text}}
    </SvHint>`,
});

export const Default: StoryFn<typeof SvHint> = Template.bind({})

Default.args = {
    text: "test"
}