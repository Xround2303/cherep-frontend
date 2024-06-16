import { defineRule, configure } from 'vee-validate'
import {
  required,
  email,
  digits,
  confirmed,
  alpha,
  alpha_num,
  alpha_dash,
  alpha_spaces,
  between,
  regex,
  numeric,
  is,
  is_not,
  min,
  max,
  min_value,
  max_value,
  integer,
  dimensions,
  ext,
  image,
  mimes,
  size,
} from '@vee-validate/rules'
import { i18n } from '../i18n/index';
import { FieldValidationMetaInfo } from '@vee-validate/i18n';

export const rules: Record<string, Function> = {
  required,
  email,
  digits,
  confirmed,
  alpha,
  alpha_num,
  alpha_dash,
  alpha_spaces,
  between,
  regex,
  numeric,
  is,
  is_not,
  min,
  max,
  min_value,
  max_value,
  integer,
  dimensions,
  ext,
  image,
  mimes,
  size
};

export const generateMessage = (values: FieldValidationMetaInfo) => {
  // @ts-ignore TODO: Я пока хз как это можно нормально пофиксить
  return i18n.global.t(`Validations.${values.rule?.name}`, values);
}

export const init = () => {
  Object.keys(rules).forEach(
    (ruleKey) =>
      // @ts-ignore Нет экспорта типа из vee-validate
      defineRule(ruleKey, rules[ruleKey as keyof typeof rules])
  );

  configure({
    generateMessage,
  })
}