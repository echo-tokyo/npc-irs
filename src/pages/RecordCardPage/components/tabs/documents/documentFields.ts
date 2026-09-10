import type { FormFieldConfig } from '@/types/formField'
import { DOCUMENT_TYPE_LABELS } from '@/utils/citizenLabels'
import { notFutureDate, required } from '@/utils/formValidation'
import { toOptions } from '../shared/toOptions'

export const DOCUMENT_FIELDS: FormFieldConfig[] = [
  {
    name: 'type',
    label: 'Тип документа',
    type: 'select',
    options: toOptions(DOCUMENT_TYPE_LABELS),
  },
  { name: 'series', label: 'Серия и номер', type: 'text', validate: required },
  {
    name: 'issueDate',
    label: 'Дата выдачи',
    type: 'date',
    validate: notFutureDate,
  },
  { name: 'issuedBy', label: 'Кем выдан', type: 'text', validate: required },
]
