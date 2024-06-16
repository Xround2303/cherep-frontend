import { StoryFn, Meta } from "@storybook/vue3";
import SvToolbar from "../components/SvToolbar/SvToolbar.vue";
import {useContextManager} from "../plugins/contextManager";


export default {
    title: "Form/SvToolbar",
    component: SvToolbar,
    argTypes: {

    }
} as Meta<typeof SvToolbar>;

const Template: StoryFn<typeof SvToolbar> = (args) => ({
    components: { SvToolbar },
    setup() {

        useContextManager().router().push({"name": "page3"});

        return { args };
    },
    template: "<SvToolbar v-bind=\"args\" />",
});

export const Default: StoryFn<typeof SvToolbar> = Template.bind({});

Default.args = {
    breadcrumbs: [
        {
            label: "Главная",
            route: "test"
        },
        {
            label: "Каталог",
            route: "test"
        },
        {
            label: "Кронштейн для двух мониторов ITECHmount MBS10-21F черный настольный, 13-27\", наклон: +45°~-45°, поворот: до 90°, до 10*2 кг, вращение (портретная орие",
            route: "test"
        },
        {
            label: "Аксессуары для телевизоров",
            route: "test"
        },
        {
            label: "Кронштейны для мониторов",
            route: "test"
        },
        {
            label: "Кронштейн для двух мониторов ITECHmount MBS10-21F черный настольный, 13-27\", наклон: +45°~-45°, поворот: до 90°, до 10*2 кг, вращение (портретная орие",
            route: "test"
        },
    ],
    profileMenuItems: [
        {
            label: "Профиль",
            route: "test"
        },
        {
            label: "Выйти",
            route: "test"
        }
    ],
    langMenuItems: [
        {
            label: "RU",
            command: (event) => {
                console.debug("RU", event);
            }
        },
        {
            label: "EN",
            command: (event) => {
                console.debug("EN", event);
            }
        }
    ],
    lang: "RU",
    userName: "Иван Иванов"
};