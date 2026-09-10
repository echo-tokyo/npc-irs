import type { FormFieldConfig } from '@/types/formField'
import { EDUCATION_LEVEL_LABELS } from '@/utils/citizenLabels'
import { toOptions } from '../shared/toOptions'

export const EDUCATION_FIELDS: FormFieldConfig[] = [
  { name: 'institution', label: 'Учебное заведение', type: 'text' },
  {
    name: 'level',
    label: 'Уровень образования',
    type: 'select',
    options: toOptions(EDUCATION_LEVEL_LABELS),
  },
  { name: 'specialty', label: 'Специальность', type: 'text' },
  { name: 'graduationYear', label: 'Год окончания', type: 'text' },
  { name: 'documentNumber', label: '№ документа', type: 'text' },
]
