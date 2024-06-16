export const CommonOptions = {
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    top: '4%',
    left: '6%',
    right: '6%',
    bottom: '25%',
  },
  legend: {
    type: 'scroll',
    bottom: 1,
    itemStyle: {
      color: 'var(--v-background-main-base)',
    },
    textStyle: {
      color: 'var(--v-text-main-base)',
    },
  },
  xAxis: {
    type: 'category',
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
    nameTextStyle: {
      color: 'var(--v-text-main-base)',
      fontSize: 12,
      padding: [20, 0, 0, 0],
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
  //series: data
};

export const SeriesOptions = {
  type: 'line',
  smooth: true,
  showSymbol: false,
  hoverAnimation: false,
  itemStyle: { opacity: 0 },
  lineStyle: { width: 1.5 },
};
