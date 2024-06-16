import { DateTime } from 'luxon';

export const CommonOptions = {
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      let result = '';
      if (params.length != 0) {
        result = DateTime.fromMillis(params[0].axisValue).toFormat('dd.MM.yyyy HH:mm:ss') + '</br>';
      }
      params.forEach(function (item) {
        let value = item.value[1];
        if (Number.isInteger(value)) {
          value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        } else if (typeof item.value[1] == 'number') {
          let parts = value.toString().split('.');
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
          value = parts.join('.');
        }
        result += item.marker + ' ' + item.seriesName + ': ' + value + '</br>';
      });
      return result;
    },
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
    type: 'time',
    axisLabel: {
      formatter: function (value) {
        return DateTime.fromMillis(value).toFormat('dd.MM.yyyy\nHH:mm:ss');
      },
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
    nameLocation: 'center',
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
        color: 'var(--v-border-main-base)',
      },
    },
  },
};

export const SeriesOptions = {
  type: 'line',
  smooth: true,
  showSymbol: false,
  hoverAnimation: false,
  itemStyle: { opacity: 0 },
  lineStyle: { width: 1.5 },
};
