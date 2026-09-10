import { useId, useRef } from 'react'
import RecordListEditor from '@/components/form/RecordListEditor'
import type { EducationRecord } from '@/types/citizen'
import { EDUCATION_FIELDS } from './educationFields'

interface EducationTabProps {
  records: EducationRecord[]
  showErrors: boolean
  onChange: (records: EducationRecord[]) => void
}

function EducationTab({ records, showErrors, onChange }: EducationTabProps) {
  const idPrefix = useId()
  const nextIndexRef = useRef(0)

  function createEmptyEducationRecord(): EducationRecord {
    nextIndexRef.current += 1
    return {
      id: `${idPrefix}-${nextIndexRef.current}`,
      institution: '',
      level: 'higher',
      specialty: '',
      graduationYear: '',
      documentNumber: '',
    }
  }

  return (
    <RecordListEditor
      items={records}
      fields={EDUCATION_FIELDS}
      addLabel='Добавить запись об образовании'
      showErrors={showErrors}
      createItem={createEmptyEducationRecord}
      onChange={onChange}
    />
  )
}

export default EducationTab
