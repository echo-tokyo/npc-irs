import type { FormFieldConfig } from '@/types/formField'
import {
  BENEFIT_CATEGORY_LABELS,
  CITIZENSHIP_LABELS,
  GENDER_LABELS,
  MARITAL_STATUS_LABELS,
  STATUS_LABELS,
} from '@/utils/citizenLabels'
import {
  combine,
  inn,
  notFutureDate,
  required,
  snils,
} from '@/utils/formValidation'
import { toOptions } from '../shared/toOptions'

export const GENERAL_FIELDS: FormFieldConfig[] = [
  { name: 'lastName', label: 'Фамилия', type: 'text', validate: required },
  { name: 'firstName', label: 'Имя', type: 'text', validate: required },
  { name: 'middleName', label: 'Отчество', type: 'text' },
  {
    name: 'gender',
    label: 'Пол',
    type: 'radio',
    options: toOptions(GENDER_LABELS),
  },
  {
    name: 'birthDate',
    label: 'Дата рождения',
    type: 'date',
    validate: combine(required, notFutureDate),
  },
  { name: 'birthPlace', label: 'Место рождения', type: 'text' },
  {
    name: 'maritalStatus',
    label: 'Семейное положение',
    type: 'select',
    options: toOptions(MARITAL_STATUS_LABELS),
  },
  {
    name: 'citizenship',
    label: 'Гражданство',
    type: 'select',
    options: toOptions(CITIZENSHIP_LABELS),
  },
  { name: 'snils', label: 'СНИЛС', type: 'text', validate: snils },
  { name: 'inn', label: 'ИНН', type: 'text', validate: inn },
  {
    name: 'status',
    label: 'Статус дела',
    type: 'select',
    options: toOptions(STATUS_LABELS),
  },
  { name: 'caseNumber', label: '№ дела', type: 'text', validate: required },
  {
    name: 'registrationDate',
    label: 'Дата постановки на учёт',
    type: 'date',
    validate: combine(required, notFutureDate),
  },
  {
    name: 'address',
    label: 'Адрес регистрации',
    type: 'text',
    validate: required,
  },
  {
    name: 'benefitCategories',
    label: 'Льготные категории',
    type: 'multiselect',
    options: toOptions(BENEFIT_CATEGORY_LABELS),
  },
]
