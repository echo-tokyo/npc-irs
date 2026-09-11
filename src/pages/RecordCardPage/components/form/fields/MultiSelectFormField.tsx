import { memo } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import type { FormFieldConfig, FormFieldOption } from '@/types/formField'

interface MultiSelectFormFieldProps {
  config: FormFieldConfig
  value: string[]
  onChange: (value: string[]) => void
}

function MultiSelectFormField({
  config,
  value,
  onChange,
}: MultiSelectFormFieldProps) {
  const options = config.options ?? []
  const selectedOptions = options.filter((option) =>
    value.includes(option.value),
  )

  function handleChange(_event: unknown, selected: FormFieldOption[]) {
    onChange(selected.map((option) => option.value))
  }

  return (
    <Autocomplete
      multiple
      size='small'
      options={options}
      value={selectedOptions}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, current) => option.value === current.value}
      onChange={handleChange}
      renderValue={(selected, getItemProps) =>
        selected.map((option, index) => {
          const { key, ...chipProps } = getItemProps({ index })
          return (
            <Chip key={key} label={option.label} size='small' {...chipProps} />
          )
        })
      }
      renderInput={(params) => <TextField {...params} label={config.label} />}
    />
  )
}

export default memo(MultiSelectFormField)
