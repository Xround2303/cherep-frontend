import { createI18n } from 'vue-i18n'
import messages, { TMessages } from '@/lang'
import pluralizationRules from './pluralization'

// Объект i18n для использования внутри ui-kit
export const i18n = createI18n<[TMessages], string>({
  locale: 'ru',
  fallbackLocale: 'ru',
  legacy: false,
  messages,
  pluralizationRules,
})

// Словарь для использования снаружи пакета
export default messages
