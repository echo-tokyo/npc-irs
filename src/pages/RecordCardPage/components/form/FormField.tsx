import { memo } from 'react'
import type { FormFieldConfig, FormFieldValue } from '@/types/formField'
import CheckboxFormField from './fields/CheckboxFormField'
import DateFormField from './fields/DateFormField'
import MultiSelectFormField from './fields/MultiSelectFormField'
import RadioFormField from './fields/RadioFormField'
import SelectFormField from './fields/SelectFormField'
import TextFormField from './fields/TextFormField'

interface FormFieldProps {
  config: FormFieldConfig
  value: FormFieldValue
  error?: string
  onChange: (name: string, value: FormFieldValue) => void
}

function FormField({ config, value, error, onChange }: FormFieldProps) {
  function handleChange(value: FormFieldValue) {
    onChange(config.name, value)
  }

  switch (config.type) {
    case 'checkbox':
      return (
        <CheckboxFormField
          config={config}
          value={value as boolean}
          onChange={handleChange}
        />
      )
    case 'radio':
      return (
        <RadioFormField
          config={config}
          value={value as string}
          error={error}
          onChange={handleChange}
        />
      )
    case 'select':
      return (
        <SelectFormField
          config={config}
          value={value as string}
          error={error}
          onChange={handleChange}
        />
      )
    case 'multiselect':
      return (
        <MultiSelectFormField
          config={config}
          value={value as string[]}
          onChange={handleChange}
        />
      )
    case 'date':
      return (
        <DateFormField
          config={config}
          value={value as string}
          error={error}
          onChange={handleChange}
        />
      )
    case 'text':
    case 'multiline':
      return (
        <TextFormField
          config={config}
          value={value as string}
          error={error}
          onChange={handleChange}
        />
      )
    default:
      return null
  }
}

export default memo(FormField)
