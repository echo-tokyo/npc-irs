import { useCallback, type Dispatch, type SetStateAction } from 'react'
import type {
  CitizenDetailsDraft,
  ContactInfo,
  DocumentRecord,
  EducationRecord,
  FamilyMember,
} from '@/types/citizen'
import type { FormFieldValue } from '@/types/formField'

interface DraftFieldHandlers {
  handleFieldChange: (name: string, value: FormFieldValue) => void
  handleContactsFieldChange: (name: string, value: FormFieldValue) => void
  handleFamilyMembersChange: (members: FamilyMember[]) => void
  handleEducationChange: (records: EducationRecord[]) => void
  handleDocumentsChange: (documents: DocumentRecord[]) => void
}

// useCallback здесь не для галочки: onChange уходит пропсом в memo()-компоненты
// полей, и без стабильной ссылки memo бесполезен — перерисовывались бы все
// поля вкладки на каждое нажатие клавиши (что и происходило до этого фикса).
export function useDraftFieldHandlers(
  setEdits: Dispatch<SetStateAction<Partial<CitizenDetailsDraft>>>,
  currentContacts: ContactInfo | undefined,
): DraftFieldHandlers {
  const handleFieldChange = useCallback(
    (name: string, value: FormFieldValue) => {
      setEdits((prev) => ({ ...prev, [name]: value }))
    },
    [setEdits],
  )

  const handleContactsFieldChange = useCallback(
    (name: string, value: FormFieldValue) => {
      setEdits((prev) => {
        const contactsBase = prev.contacts ?? currentContacts
        if (!contactsBase) return prev
        return { ...prev, contacts: { ...contactsBase, [name]: value } }
      })
    },
    [setEdits, currentContacts],
  )

  const handleFamilyMembersChange = useCallback(
    (familyMembers: FamilyMember[]) => {
      setEdits((prev) => ({ ...prev, familyMembers }))
    },
    [setEdits],
  )

  const handleEducationChange = useCallback(
    (education: EducationRecord[]) => {
      setEdits((prev) => ({ ...prev, education }))
    },
    [setEdits],
  )

  const handleDocumentsChange = useCallback(
    (documents: DocumentRecord[]) => {
      setEdits((prev) => ({ ...prev, documents }))
    },
    [setEdits],
  )

  return {
    handleFieldChange,
    handleContactsFieldChange,
    handleFamilyMembersChange,
    handleEducationChange,
    handleDocumentsChange,
  }
}
