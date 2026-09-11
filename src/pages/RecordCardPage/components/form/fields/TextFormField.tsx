import { memo } from 'react'
import TextField from '@mui/material/TextField'
import type { FormFieldConfig } from '@/types/formField'

interface TextFormFieldProps {
  config: FormFieldConfig
  value: string
  error?: string
  onChange: (value: string) => void
}

function TextFormField({ config, value, error, onChange }: TextFormFieldProps) {
  const isMultiline = config.type === 'multiline'

  return (
    <TextField
      fullWidth
      size='small'
      label={config.label}
      value={value}
      multiline={isMultiline}
      minRows={isMultiline ? 3 : undefined}
      error={Boolean(error)}
      helperText={error ?? ' '}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default memo(TextFormField)
