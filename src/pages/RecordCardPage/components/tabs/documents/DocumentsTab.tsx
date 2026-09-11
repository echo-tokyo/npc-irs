import { useId, useRef } from 'react'
import type { DocumentRecord } from '@/types/citizen'
import RecordListEditor from '../../form/RecordListEditor'
import { DOCUMENT_FIELDS } from './documentFields'

interface DocumentsTabProps {
  documents: DocumentRecord[]
  showErrors: boolean
  onChange: (documents: DocumentRecord[]) => void
}

function DocumentsTab({ documents, showErrors, onChange }: DocumentsTabProps) {
  const idPrefix = useId()
  const nextIndexRef = useRef(0)

  function createEmptyDocument(): DocumentRecord {
    nextIndexRef.current += 1
    return {
      id: `${idPrefix}-${nextIndexRef.current}`,
      type: 'passport',
      series: '',
      issueDate: '',
      issuedBy: '',
    }
  }

  return (
    <RecordListEditor
      items={documents}
      fields={DOCUMENT_FIELDS}
      addLabel='Добавить документ'
      showErrors={showErrors}
      createItem={createEmptyDocument}
      onChange={onChange}
    />
  )
}

export default DocumentsTab
