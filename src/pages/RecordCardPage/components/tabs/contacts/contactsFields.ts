import type { FormFieldConfig, FormFieldOption } from '@/types/formField'
import { PREFERRED_CONTACT_METHOD_LABELS } from '@/utils/citizenLabels'
import { combine, email, phone, required } from '@/utils/formValidation'
import { toOptions } from '../shared/toOptions'

const CALL_TIME_OPTIONS: FormFieldOption[] = [
  { value: 'Утро (9:00-12:00)', label: 'Утро (9:00-12:00)' },
  { value: 'День (12:00-17:00)', label: 'День (12:00-17:00)' },
  { value: 'Вечер (17:00-20:00)', label: 'Вечер (17:00-20:00)' },
  { value: 'В любое время', label: 'В любое время' },
]

export const CONTACTS_FIELDS: FormFieldConfig[] = [
  {
    name: 'phone',
    label: 'Основной телефон',
    type: 'text',
    validate: combine(required, phone),
  },
  {
    name: 'secondaryPhone',
    label: 'Доп. телефон',
    type: 'text',
    validate: phone,
  },
  { name: 'email', label: 'Email', type: 'text', validate: email },
  {
    name: 'preferredMethod',
    label: 'Предпочтительный способ связи',
    type: 'radio',
    options: toOptions(PREFERRED_CONTACT_METHOD_LABELS),
  },
  {
    name: 'convenientCallTime',
    label: 'Удобное время для звонка',
    type: 'select',
    options: CALL_TIME_OPTIONS,
  },
  {
    name: 'smsConsent',
    label: 'Согласие на SMS-уведомления',
    type: 'checkbox',
  },
]
