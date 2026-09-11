import { memo } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import type { FormFieldConfig } from '@/types/formField'

interface CheckboxFormFieldProps {
  config: FormFieldConfig
  value: boolean
  onChange: (value: boolean) => void
}

function CheckboxFormField({
  config,
  value,
  onChange,
}: CheckboxFormFieldProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
        />
      }
      label={config.label}
    />
  )
}

export default memo(CheckboxFormField)
