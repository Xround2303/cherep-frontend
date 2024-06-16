// Общие настройки для графика
export const CommonOptions = {
  tooltip: {
    trigger: 'item',
  },
};

// Настройки для серии
export const SeriesOptions = {
  type: 'pie',
  label: {
    show: false,
  },
  emphasis: {
    scaleSize: 1,
  },
  labelLine: {
    show: false,
  },
  hoverAnimation: true,
  radius: ['50%', '50%'],
};
