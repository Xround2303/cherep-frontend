import { computed, useAttrs } from 'vue'
import {SetupContext} from "@vue/runtime-core";

const COMPARE_ONLY = true;
const COMPARE_EXCLUDE = false;

const filterAttrs = (list: Array<string>, compareTyp: boolean, attrs: SetupContext['attrs']) => {
  const result: any = {};
  for (const attr in (attrs || {})) {
    if (list.includes(attr) == compareTyp) {
      result[attr] = attrs[attr];
    }
  }
  return result;
}

// Отдаёт computed-свойство с зафильтрованными по списку вхождений атрибутами $attrs
const computedAttrsOnly = (list: Array<string>, attrs: SetupContext['attrs']) => {
  return computed(() => filterAttrs(list, COMPARE_ONLY, attrs));
}

// Отдаёт computed-свойство с зафильтрованными по списку исключений атрибутами $attrs
const computedAttrsExcept = (list: Array<string>, attrs: SetupContext['attrs']) => {
  return computed(() => filterAttrs(list, COMPARE_EXCLUDE, attrs));
}

export { computedAttrsOnly, computedAttrsExcept }
