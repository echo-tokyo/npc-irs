import type { FormFieldConfig } from '@/types/formField'
import { RELATIONSHIP_LABELS } from '@/utils/citizenLabels'
import { notFutureDate, phone, required } from '@/utils/formValidation'
import { toOptions } from '../shared/toOptions'

export const FAMILY_MEMBER_FIELDS: FormFieldConfig[] = [
  { name: 'fullName', label: 'ФИО', type: 'text', validate: required },
  {
    name: 'relationship',
    label: 'Степень родства',
    type: 'select',
    options: toOptions(RELATIONSHIP_LABELS),
  },
  {
    name: 'birthDate',
    label: 'Дата рождения',
    type: 'date',
    validate: notFutureDate,
  },
  { name: 'phone', label: 'Телефон', type: 'text', validate: phone },
]
