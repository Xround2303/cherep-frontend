import { StoryFn, Meta } from '@storybook/vue3';
import SvChartCard from '../components/SvChart/SvChartCard.vue'


export default {
    title: 'Form/SvChartCard',
    component: SvChartCard,
    argTypes: {
        loading: {
            control: 'boolean',
            defaultValue: false,
            description: 'Загрузка',
            type: {
                summary: 'boolean',
            },
            table: {
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        shadow: {
            control: 'boolean',
            defaultValue: false,
            description: 'Тень для карточки',
            type: {
                summary: 'boolean',
            },
            table: {
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        skeleton: {
            control: 'boolean',
            defaultValue: false,
            description: 'Использовать скелетон при загрузке',
            type: {
                summary: 'boolean',
            },
            table: {
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        border: {
            control: 'boolean',
            defaultValue: false,
            description: 'Border для карточки',
            type: {
                summary: 'boolean',
            },
            table: {
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        styleHeader: {
            control: 'text',
            defaultValue: '',
            description: 'Стиль заголовка',
            type: {
                summary: 'text',
            },
            table: {
                defaultValue: {
                    summary: '',
                },
            },
        },
        online: {
            control: 'boolean',
            defaultValue: false,
            description: 'Режим онлайн',
            type: {
                summary: 'boolean',
            },
            table: {
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        chartOptions: {
            description: 'Свойства графика',
            control: { type: 'object' },
            defaultValue: {},
        },
        title: {
            control: 'text',
            defaultValue: '',
            description: 'Название графика',
            type: {
                summary: 'text',
            },
            table: {
                defaultValue: {
                    summary: '',
                },
            },
        },
        showLink: {
            control: 'boolean',
            defaultValue: false,
            description: 'Отображение иконки для перехода по ссылке',
            type: {
                summary: 'boolean',
            },
            table: {
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        openLink: { action: 'clicked' },
        height: {
            control: 'text',
            defaultValue: '',
            description: 'Высота графика',
            type: {
                summary: 'text',
            },
            table: {
                defaultValue: {
                    summary: '',
                },
            },
        },
    }
} as Meta<typeof SvChartCard>;

const Template: StoryFn<typeof SvChartCard> = (args) => ({
    components: { SvChartCard },
    setup() {
        return { args };
    },
    template: `<SvChartCard  v-bind="args" />`,
});

export const Default: StoryFn<typeof SvChartCard> = Template.bind({})

Default.args = {
    type: 'line',
    title: 'Card',
    border: true,
    styleHeader: 'font-size: 14px; font-weight: 700;',
    height: '250px',
    chartOptions: {
        grid: {
            bottom: '25%',
            left: '6%',
            right: '6%',
            top: '4%',
        },
        legend: {
            bottom: 1,
            type: 'scroll',
        },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel: {
                color: 'var(--v-text-main-base)',
            },
            splitLine: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: 'var(--v-border-main-base)',
                },
            },
        },
        yAxis: {
            type: 'value',
            boundaryGap: false,
            axisLabel: {
                color: 'var(--v-text-main-base)',
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'var(--v-border-main-base)',
                },
            },
            interval: null,
            axisLine: {
                lineStyle: {
                    color: 'var(--v-background-main-base)',
                },
            },
        },
        series: [
            {
                type: 'line',
                data: [150, 232, 201, 154, 190, 330, 410],
                smooth: true,
                showSymbol: false,
                hoverAnimation: false,
                itemStyle: { opacity: 0 },
                lineStyle: { width: 1.5 },
            },
        ],
    },
}