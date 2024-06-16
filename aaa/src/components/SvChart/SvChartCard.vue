<template>
  <div class="border-1 border-round-2xl border-black-alpha-20 p-3">
    <div class="flex flex-column">
      <div class="mb-2 flex align-items-center">
        <span :style="styleHeader">{{ title }}</span>
        <a v-if="showLink" @click="openLink">
          <slot name="icon">
            <i class="pi pi-cog" ></i>
          </slot>
        </a>
      </div>
      <div class="w-full ">
        <template v-if="skeleton ? !loading : true">
          <sv-chart
            ref="chartRef"
            :chart-options="chartOptions"
            :style="`height: ${height};`"
          />
        </template>
        <template v-else>
          loader...
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import moment from 'moment';
/*import SvCheckPermissionMixin from './../../mixins/CheckPermissionMixin';
import SvNotificationMixin from './../../mixins/NotificationMixin';*/
import SvChart from './SvChart.vue';
import {onMounted, ref} from "vue";
import SvCard from "../primevue-wrappers/SvCard.vue";
import { DateTime } from 'luxon';


const props = defineProps({
  // тип графика
  type: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  // тень для карточки с графиком
  shadow: {
    type: Boolean,
    default: false,
  },
  // border для карточки с графиком
  border: {
    type: Boolean,
    default: false,
  },
  styleHeader: {
    type: String,
    default: '',
  },
  skeleton: {
    type: Boolean,
    default: false,
  },

  // Онлайн режим
  online: {
    type: Boolean,
    default: false,
  },
  // Интервал для запроса данных онлайн-графика (сек)
  // Игнорируется, если выбран параметр periods
  reloadInterval: {
    type: Number,
    default: 30,
  },
  // Показывать кнопки выбора периода
  periods: {
    type: Boolean,
    default: false,
  },

  // Опции графика согласно документации Echarts
  chartOptions: {
    type: Object,
    default: () => {},
  },
  title: {
    type: String,
    default: '',
  },

  // Отображение иконки для перехода по ссылке
  showLink: {
    type: Boolean,
    default: false,
  },
  openLink: {
    type: Function,
    default: null,
  },

  // Высота графика
  height: {
    type: String,
    default: '',
  },
})
const chartRef = ref();
const isOnline = props.online;
const isNeedReload = ref(true)
const timer = ref(null)
const modePeriods = ref([
  "1",
  "2",
  "3",
  // this.$t('Chart.fields.hour'),
  // this.$t('Chart.fields.day'),
  // this.$t('Chart.fields.week')
]);
const modePeriod = ref(0);
const onlineReloadInterval = ref(30);
const emits = defineEmits([
  'fetch'
])
// mixins: [SvNotificationMixin, SvCheckPermissionMixin],


onMounted(() => {
  if (!props.periods) {
    onlineReloadInterval.value = props.reloadInterval;
  }

  loadItems();
  if (isOnline.value) timer.value = setInterval(loadItems, 1000 * onlineReloadInterval.value);
})







const refresh = () => {
  this.$nextTick(() => {
    if (chartRef.value) chartRef.value.refresh();
  });
}

const getQueryOptions= () => {
  switch (props.type) {
    case 'timeline':
      return getTimeLineQueryOptions();
    case 'heatmap':
      return {
        currentDate: new Date(),
        mode: isOnline.value && !isNeedReload.value ? 'online' : 'once',
      };
    case 'pie':
      return { mode: isOnline.value && !isNeedReload.value ? 'online' : 'once' };
    case 'line':
      return { mode: isOnline.value && !isNeedReload.value ? 'online' : 'once' };
    default:
      break;
  }
}

const getTimeLineQueryOptions = () => {
  let params;
  if (isOnline.value && !isNeedReload.value) {
    // запрашиваем только дельту изменений
    params = {
      step: onlineReloadInterval.value,
      mode: 'online',
    };
  } else {
    // запрашиваем весь массив данных
    var begin = null;
    var end = null;
    switch (modePeriod.value) {
      case 0:
        end = Math.round(new Date().getTime() / 1000) - onlineReloadInterval.value;
        begin = Math.round(DateTime.now().minus({hours: 4}).toMillis() / 1000);
        break;
      case 1:
        end = Math.round(new Date().getTime() / 1000) - onlineReloadInterval.value;
        begin = Math.round(DateTime.now().minus({days: 1}).toMillis() / 1000);
        break;
      case 2:
        end = Math.round(new Date().getTime() / 1000) - onlineReloadInterval.value;
        begin = Math.round(DateTime.now().minus({days: 7}).toMillis() / 1000);
        break;
      default:
        break;
    }

    var diff = end - begin;
    params = {
      range: {
        begin: begin,
        end: end,
      },
      mode: 'once',
      step: calculateStep(diff),
    };
    if (isOnline.value) {
      props.isNeedReload = false;
      params.step = onlineReloadInterval.value;
    }
  }
  return params;
}

const calculateStep = (diff) => {
  if (diff > 259200) return 300; // больше 3 суток - по 5 минут
  if (diff > 86400) return 60; // больше 1 суток - по 1 минуте
  if (diff > 1440) return 30; // больше 1 часа - по 30 секунд
  return 15;
}

const changePeriod = () => {
  this.isNeedReload = true;
  switch (modePeriod.value) {
    case 0:
      this.onlineReloadInterval = 30;
      break;
    case 1:
      this.onlineReloadInterval = 60;
      break;
    case 2:
      this.onlineReloadInterval = 300;
      break;
    default:
      break;
  }
  loadItems();
  clearInterval(timer.value);
  timer.value = setInterval(loadItems, 1000 * onlineReloadInterval.value);
}

const loadItems = (mode = 'online') => {
  if (mode === 'once') {
    isOnline.value = false;
    clearInterval(timer.value);
  }
  emits('fetch', getQueryOptions());
}

</script>


