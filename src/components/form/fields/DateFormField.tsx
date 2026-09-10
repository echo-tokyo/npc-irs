import dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import type { FormFieldConfig } from '@/types/formField'

interface DateFormFieldProps {
  config: FormFieldConfig
  value: string
  error?: string
  onChange: (value: string) => void
}

function DateFormField({ config, value, error, onChange }: DateFormFieldProps) {
  return (
    <DatePicker
      label={config.label}
      value={value ? dayjs(value) : null}
      onChange={(newValue) =>
        onChange(newValue ? newValue.format('YYYY-MM-DD') : '')
      }
      format='DD.MM.YYYY'
      slotProps={{
        textField: {
          size: 'small',
          fullWidth: true,
          error: Boolean(error),
          helperText: error ?? ' ',
        },
      }}
    />
  )
}

export default DateFormField
