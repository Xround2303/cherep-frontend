export default {
  grid: {
    height: '50%',
    top: '0%',
  },
  tooltip: {
    position: 'top',
    formatter: function (params) {
      return `${params.data[2]}%`;
    },
  },
  xAxis: {
    type: 'category',
    name: '',
    nameLocation: 'start',
    splitArea: {
      show: true,
    },
    axisLine: {
      lineStyle: {
        color: 'var(--v-background-main-base)',
      },
    },
    axisLabel: {
      // Метки (насечки) на оси
      color: 'var(--v-text-main-base)',
      fontSize: 10,
      rotate: 90,
    },
  },
  yAxis: {
    name: '',
    type: 'category',
    splitArea: {
      show: true,
    },
    axisLine: {
      lineStyle: {
        color: 'var(--v-background-main-base)',
      },
    },
    axisLabel: {
      color: 'var(--v-text-main-base)',
      fontSize: 13,
      fontWeight: 'normal',
    },
  },
  visualMap: {
    min: 0,
    max: 100,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '0%',
    inRange: {
      color: ['var(--v-heat-map1-base)', 'var(--v-heat-map2-base)', 'var(--v-heat-map3-base)'],
    },
    textStyle: {
      color: 'var(--v-text-main-base)',
    },
  },
  series: {
    type: 'heatmap',
    label: {
      show: false,
    },
    itemStyle: {
      borderWidth: 1,
      borderColor: 'var(--v-background-main-base)',
    },
    //data: data.series
  },
};
