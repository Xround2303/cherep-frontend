import { StoryFn, Meta } from '@storybook/vue3';
import SvCard from '../components/primevue-wrappers/SvCard.vue'
import SvButton from "../components/primevue-wrappers/SvButton.vue";


export default {
    title: 'Form/SvCard',
    component: SvCard,
    argTypes: {

    }
} as Meta<typeof SvCard>;

const Template: StoryFn<typeof SvCard> = (args) => ({
    components: { SvCard, SvButton },
    setup() {
        return { args };
    },
    template: `
    <div class="col-4">
      <SvCard v-bind="args">
        <template #title>
          Заголовок
        </template>
        <template #subtitle>
          Подзаголовок
        </template>
        <template #header.action.btn>
          Кнопки
        </template>
        <template #footer>
          Контент в футере
        </template>
        Контентная часть
      </SvCard>
    </div>
    `,
});

export const Default: StoryFn<typeof SvCard> = Template.bind({})

Default.args = {

}