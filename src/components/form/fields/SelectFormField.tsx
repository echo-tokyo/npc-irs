import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import type { FormFieldConfig } from '@/types/formField'

interface SelectFormFieldProps {
  config: FormFieldConfig
  value: string
  error?: string
  onChange: (value: string) => void
}

function SelectFormField({
  config,
  value,
  error,
  onChange,
}: SelectFormFieldProps) {
  return (
    <TextField
      select
      fullWidth
      size='small'
      label={config.label}
      value={value}
      error={Boolean(error)}
      helperText={error ?? ' '}
      onChange={(event) => onChange(event.target.value)}
    >
      {config.options?.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default SelectFormField
