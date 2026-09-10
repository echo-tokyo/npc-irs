import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import type { FormFieldConfig, FormFieldValue } from '@/types/formField'
import { asFieldValues, validateFields } from '@/utils/formValidation'
import FormField from './FormField'

interface RecordListEditorProps<T extends { id: string }> {
  items: T[]
  fields: FormFieldConfig[]
  addLabel: string
  showErrors: boolean
  createItem: () => T
  onChange: (items: T[]) => void
}

function RecordListEditor<T extends { id: string }>({
  items,
  fields,
  addLabel,
  showErrors,
  createItem,
  onChange,
}: RecordListEditorProps<T>) {
  function handleAdd() {
    onChange([...items, createItem()])
  }

  function handleRemove(id: string) {
    onChange(items.filter((item) => item.id !== id))
  }

  function handleFieldChange(id: string, name: string, value: FormFieldValue) {
    onChange(
      items.map((item) => (item.id === id ? { ...item, [name]: value } : item)),
    )
  }

  return (
    <Stack spacing={2}>
      {items.map((item) => {
        const errors = showErrors
          ? validateFields(fields, asFieldValues(item))
          : {}

        function handleItemFieldChange(name: string, value: FormFieldValue) {
          handleFieldChange(item.id, name, value)
        }

        return (
          <Paper key={item.id} variant='outlined' sx={{ p: 2 }}>
            <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
              {fields.map((field) => (
                <Grid key={field.name} size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormField
                    config={field}
                    value={item[field.name as keyof T] as FormFieldValue}
                    error={errors[field.name]}
                    onChange={handleItemFieldChange}
                  />
                </Grid>
              ))}
              <Grid size={{ xs: 12, md: 1 }} sx={{ pt: 0.5 }}>
                <IconButton
                  onClick={() => handleRemove(item.id)}
                  aria-label='Удалить'
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        )
      })}

      <Button
        startIcon={<AddIcon />}
        onClick={handleAdd}
        sx={{ alignSelf: 'flex-start' }}
      >
        {addLabel}
      </Button>
    </Stack>
  )
}

export default RecordListEditor
