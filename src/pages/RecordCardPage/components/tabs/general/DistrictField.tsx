import { memo } from 'react'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

interface DistrictFieldProps {
  district: string
  districts: string[]
  isLoading: boolean
  onChange: (value: string) => void
}

function DistrictField({
  district,
  districts,
  isLoading,
  onChange,
}: DistrictFieldProps) {
  const options = isLoading ? (district ? [district] : []) : districts

  return (
    <TextField
      select
      fullWidth
      size='small'
      label='Район'
      value={district}
      helperText=' '
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default memo(DistrictField)
