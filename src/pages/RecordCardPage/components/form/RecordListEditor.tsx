import { useCallback, useEffect, useRef } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import type { FormFieldConfig, FormFieldValue } from '@/types/formField'
import RecordListItem from './RecordListItem'

interface RecordListEditorProps<T extends { id: string }> {
  items: T[]
  fields: FormFieldConfig[]
  addLabel: string
  showErrors: boolean
  createItem: () => T
  onChange: (items: T[]) => void
}

// handleFieldChange/handleRemove читают items/onChange из рефа и обёрнуты в
// useCallback с пустыми зависимостями — ссылка должна быть неизменной, иначе
// memo() на RecordListItem бесполезен и правка одной карточки перерисовывает
// весь список.
function RecordListEditor<T extends { id: string }>({
  items,
  fields,
  addLabel,
  showErrors,
  createItem,
  onChange,
}: RecordListEditorProps<T>) {
  const latestRef = useRef({ items, onChange })
  useEffect(() => {
    latestRef.current = { items, onChange }
  })

  function handleAdd() {
    onChange([...items, createItem()])
  }

  const handleFieldChange = useCallback(
    (id: string, name: string, value: FormFieldValue) => {
      const latest = latestRef.current
      latest.onChange(
        latest.items.map((item) =>
          item.id === id ? { ...item, [name]: value } : item,
        ),
      )
    },
    [],
  )

  const handleRemove = useCallback((id: string) => {
    const latest = latestRef.current
    latest.onChange(latest.items.filter((item) => item.id !== id))
  }, [])

  return (
    <Stack spacing={2}>
      {items.map((item) => (
        <RecordListItem
          key={item.id}
          item={item}
          fields={fields}
          showErrors={showErrors}
          onFieldChange={handleFieldChange}
          onRemove={handleRemove}
        />
      ))}

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
