import { memo, useCallback } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import type { FormFieldConfig, FormFieldValue } from '@/types/formField'
import { asFieldValues, validateFields } from '@/utils/formValidation'
import FormField from './FormField'

interface RecordListItemProps<T extends { id: string }> {
  item: T
  fields: FormFieldConfig[]
  showErrors: boolean
  onFieldChange: (id: string, name: string, value: FormFieldValue) => void
  onRemove: (id: string) => void
}

function RecordListItem<T extends { id: string }>({
  item,
  fields,
  showErrors,
  onFieldChange,
  onRemove,
}: RecordListItemProps<T>) {
  const errors = showErrors ? validateFields(fields, asFieldValues(item)) : {}

  const handleChange = useCallback(
    (name: string, value: FormFieldValue) => {
      onFieldChange(item.id, name, value)
    },
    [item.id, onFieldChange],
  )

  return (
    <Paper variant='outlined' sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
        {fields.map((field) => (
          <Grid key={field.name} size={{ xs: 12, sm: 6, md: 3 }}>
            <FormField
              config={field}
              value={item[field.name as keyof T] as FormFieldValue}
              error={errors[field.name]}
              onChange={handleChange}
            />
          </Grid>
        ))}
        <Grid size={{ xs: 12, md: 1 }} sx={{ pt: 0.5 }}>
          <IconButton onClick={() => onRemove(item.id)} aria-label='Удалить'>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default memo(RecordListItem) as typeof RecordListItem
