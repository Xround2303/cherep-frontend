<template>
  <div ref="chartRef" />
</template>


<script setup lang="ts">
import * as ECharts from 'echarts';
import { cloneDeep, isObject } from 'lodash';
import {computed, onMounted, ref, watch} from "vue";

const props = defineProps({
  chartOptions: {
    type: Object,
    default: () => {},
  }
})



let chartArea;
const chartRef = ref(null);
const options = computed(() => props.chartOptions)

watch(options, () => init())

const init = () => {
  if (options.value != null && chartArea == null) {
    chartArea = ECharts.init(chartRef.value);
    chartArea.setOption(setColorsByVariable(options.value));
  }
}

const refresh = () => {
  if (options.value != null) {
    let options = chartArea.getOption();
    if (options) {
      // Сохраняем настройки отображаемых серий
      let legend = options.legend[0];
      if (legend && legend.selectedMode && legend.data) {
        // Проверяем, что легенда не изменилась
        let check = legend.data.every((el, index) => {
          return (
            options.value.legend.data[index] && el.name == options.value.legend.data[index].name
          );
        });
        if (check) options.value.legend.selected = legend.selected;
      }
      if (Array.isArray(options.visualMap) && options.visualMap.length != 0) {
        options.value.visualMap.range = cloneDeep(options.visualMap[0].range);
      }
    }

    if (options.series.length != options.value.series.length) {
      chartArea.clear();
    }

    this.chartArea.setOption(this.setColorsByVariable(this.chartOptions));
  }
}

const setColorsByVariable = (options) => {
  let clone = cloneDeep(options);
  setColorsIterate({ options: clone }, 'options');
  return clone;
}

const setColorsIterate = (parameter, key) => {
  if (isObject(parameter[key])) {
    Object.keys(parameter[key]).forEach((k) => {
      setColorsIterate(parameter[key], k);
    });
  } else if (Array.isArray(parameter[key])) {
    parameter[key].forEach((element, index) => {
      setColorsIterate(parameter[key], index);
    });
  } else if (typeof parameter[key] == 'string' && /^var\(--v-[A-Za-z0-9-]+\)$/.test(parameter[key])) {
    parameter[key] = getComputedStyle(document.body).getPropertyValue(
      parameter[key].substring(4, parameter[key].length - 1),
    );
  }
  else {
    return false;
  }
}

onMounted(() => {
  init();
  window.addEventListener('resize',  () => {
    if (chartArea) {
      chartArea.resize();
    }
  });

})
</script>

<style  scoped>
.echarts {
  width: 100%;
  height: 250px;
}
@mixin md {
  @media (max-width: 1400px) {
    @content;
  }
}
@include md() {
  .echarts {
    height: 280px;
  }
}
</style>