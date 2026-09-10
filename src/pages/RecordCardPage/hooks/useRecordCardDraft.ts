import { useState } from 'react'
import { hasValidationErrors } from '../validateRecordCard'
import { useUpdateCitizenDetails } from './useUpdateCitizenDetails'
import type {
  CitizenDetails,
  DocumentRecord,
  EducationRecord,
  FamilyMember,
} from '@/types/citizen'
import type { FormFieldValue } from '@/types/formField'

interface UseRecordCardDraftResult {
  details: CitizenDetails
  isDirty: boolean
  showErrors: boolean
  isSaving: boolean
  handleFieldChange: (name: string, value: FormFieldValue) => void
  handleContactsFieldChange: (name: string, value: FormFieldValue) => void
  handleFamilyMembersChange: (members: FamilyMember[]) => void
  handleEducationChange: (records: EducationRecord[]) => void
  handleDocumentsChange: (documents: DocumentRecord[]) => void
  reset: () => void
  save: (onSaved: () => void) => void
}

export function useRecordCardDraft(
  initialDetails: CitizenDetails,
): UseRecordCardDraftResult {
  const [details, setDetails] = useState(initialDetails)
  const [savedDetails, setSavedDetails] = useState(initialDetails)
  const [showErrors, setShowErrors] = useState(false)
  const updateMutation = useUpdateCitizenDetails()

  const isDirty = JSON.stringify(details) !== JSON.stringify(savedDetails)

  function handleFieldChange(name: string, value: FormFieldValue) {
    setDetails((prev) => ({ ...prev, [name]: value }))
  }

  function handleContactsFieldChange(name: string, value: FormFieldValue) {
    setDetails((prev) => ({
      ...prev,
      contacts: { ...prev.contacts, [name]: value },
    }))
  }

  function handleFamilyMembersChange(familyMembers: FamilyMember[]) {
    setDetails((prev) => ({ ...prev, familyMembers }))
  }

  function handleEducationChange(education: EducationRecord[]) {
    setDetails((prev) => ({ ...prev, education }))
  }

  function handleDocumentsChange(documents: DocumentRecord[]) {
    setDetails((prev) => ({ ...prev, documents }))
  }

  function reset() {
    setDetails(savedDetails)
    setShowErrors(false)
  }

  function save(onSaved: () => void) {
    if (hasValidationErrors(details)) {
      setShowErrors(true)
      return
    }

    updateMutation.mutate(details, {
      onSuccess: (saved) => {
        setSavedDetails(saved)
        setShowErrors(false)
        onSaved()
      },
    })
  }

  return {
    details,
    isDirty,
    showErrors,
    isSaving: updateMutation.isPending,
    handleFieldChange,
    handleContactsFieldChange,
    handleFamilyMembersChange,
    handleEducationChange,
    handleDocumentsChange,
    reset,
    save,
  }
}
