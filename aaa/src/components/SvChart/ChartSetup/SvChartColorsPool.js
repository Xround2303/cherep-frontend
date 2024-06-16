import vuetify from '../../../plugins/vuetify';

const pieColors = {
  items: [],
};
const lineColors = {
  items: [],
};
const barColors = {
  items: [],
};

/**
 * @param {string} rawRegexp
 * @param {import('vuetify').Framework} customVuetify
 * @description Производит поиск цветов по регексу по текущей теме
 */
function getThemeColorsByRegex(rawRegexp, customVuetify) {
  const regex = new RegExp(rawRegexp);
  const currentTheme = customVuetify.theme.currentTheme;
  return Object.keys(currentTheme)
    .filter((value) => regex.test(value))
    .map((value) => `var(--v-${value}-base)`);
}

/**
 * @param {Object} colors
 * @param {string} rawRegex
 * @param {import('vuetify').Framework} customVuetify
 * @description Отдает массив ранее запомненных цветов,
 * если массив пустой или сменилась тема, заполняет цвета заново
 */
function getColors(colors, rawRegex, customVuetify = null) {
  if (!customVuetify) {
    customVuetify = vuetify.framework;
  }

  if (colors.items.length === 0) {
    colors.items = getThemeColorsByRegex(rawRegex, customVuetify);
  }
  return colors.items;
}

/**
 * @description Передаем в функцию текущий экземпляр vuetify
 * Она нам будет возвращать цвета для типа графика pie по регексу /chart-pie\d+/
 * @param {import("vuetify").Framework} [customVuetify]
 * @returns {{getPieColors: () => string[], getPieColor: (index: number) => string}}
 */
export function usePieColors(customVuetify) {
  function getPieColors() {
    return getColors(pieColors, 'chart-pie\\d+', customVuetify);
  }

  function getPieColor(index) {
    const colorArray = getPieColors();
    return colorArray[index % colorArray.length];
  }

  return {
    getPieColors,
    getPieColor,
  };
}

/**
 * @description Передаем в функцию текущий экземпляр vuetify
 * Она нам будет возвращать цвета для типа графика Line по регексу /graph-line\d+/
 * @returns {{getLineColors: () => string[], getLineColor: (index: number) => string}}
 * @param {import("vuetify").Framework} [customVuetify]
 */
export function useLineColors(customVuetify = null) {
  function getLineColors() {
    return getColors(lineColors, 'graph-line\\d+', customVuetify);
  }

  function getLineColor(index) {
    const colorArray = getLineColors();
    return colorArray[index % colorArray.length];
  }

  return {
    getLineColors,
    getLineColor,
  };
}

/**
 * @description Передаем в функцию текущий экземпляр vuetify
 * Она нам будет возвращать цвета для типа графика Bar по регексу /chart-bar\d+/
 * @returns {{getBarColors: () => string[], getBarColor: (index: number) => string}}
 * @param {import("vuetify").Framework} [customVuetify]
 */
export function useBarColors(customVuetify = null) {
  function getBarColors() {
    return getColors(barColors, 'chart-bar\\d+', customVuetify);
  }

  function getBarColor(index) {
    const colorArray = getBarColors();
    return colorArray[index % colorArray.length];
  }

  return {
    getBarColors,
    getBarColor,
  };
}

export default {
  // Цвета eCharts по умолчанию
  /*colors: [
    '#2f4554', '#61a0a8', '#d48265', '#6e7074', '#91c7ae', '#c23531',
    '#c4ccd3', '#ca8622', '#546570', '#749f83', '#bda29a',
  ],*/
  colors: [
    '#F68B1F',
    '#00B7C6',
    '#F32162',
    '#B53319',
    '#CBF321',
    '#F32162',
    '#E721F3',
    '#2DF321',
    '#2196F3',
    '#708DA4',
    '#90CBF9',
  ],

  //Kononov: Потом разберусь как с это переработать
  // Получить очередной цвет из пула
  getColor(index) {
    return this.colors[index % this.colors.length];
  },

  // Получить весь массив цветов
  getAllColors() {
    return this.colors;
  },
};
