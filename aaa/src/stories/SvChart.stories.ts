import { StoryFn, Meta } from '@storybook/vue3';
import SvChart from '../components/SvChart/SvChart.vue'


export default {
    title: 'Form/SvChart',
    component: SvChart,
    argTypes: {
        chartOptions: {
            description: 'Свойства графика',
            control: { type: 'object' },
            defaultValue: {},
        },
    }
} as Meta<typeof SvChart>;

const Template: StoryFn<typeof SvChart> = (args) => ({
    components: { SvChart },
    setup() {

        const options = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line',
                },
            ],
        }

        return { args, options };
    },
    template: `<SvChart style="height: 250px" v-bind="args" :chart-options="options" />`,
});

export const Default: StoryFn<typeof SvChart> = Template.bind({})

Default.args = {
}