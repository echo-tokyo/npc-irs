import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import type { FormFieldConfig } from '@/types/formField'

interface RadioFormFieldProps {
  config: FormFieldConfig
  value: string
  error?: string
  onChange: (value: string) => void
}

function RadioFormField({
  config,
  value,
  error,
  onChange,
}: RadioFormFieldProps) {
  return (
    <FormControl error={Boolean(error)}>
      <FormLabel sx={{ fontSize: 13 }}>{config.label}</FormLabel>
      <RadioGroup
        row
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {config.options?.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio size='small' />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{error ?? ' '}</FormHelperText>
    </FormControl>
  )
}

export default RadioFormField
