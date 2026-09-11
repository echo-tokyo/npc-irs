import { useState } from 'react'
import {
  getCitizenContacts,
  getCitizenDocuments,
  getCitizenEducation,
  getCitizenFamilyMembers,
} from '@/services/citizenDetailsService'
import type { CitizenDetailsDraft, CitizenGeneralInfo } from '@/types/citizen'
import type { TabValue } from '../constants/tabs'
import { useCitizenSection } from './useCitizenSection'
import { useDraftFieldHandlers } from './useDraftFieldHandlers'
import { useStableSaveReset } from './useStableSaveReset'
import { useUpdateCitizenDetails } from './useUpdateCitizenDetails'

export type LazySectionsLoading = Record<
  'familyMembers' | 'education' | 'contacts' | 'documents',
  boolean
>

export function useRecordCardDraft(
  citizenId: number,
  initialGeneralInfo: CitizenGeneralInfo,
  visitedTabs: Set<TabValue>,
) {
  const familyQuery = useCitizenSection(
    'citizenFamilyMembers',
    citizenId,
    visitedTabs.has('family'),
    getCitizenFamilyMembers,
  )
  const educationQuery = useCitizenSection(
    'citizenEducation',
    citizenId,
    visitedTabs.has('education'),
    getCitizenEducation,
  )
  const contactsQuery = useCitizenSection(
    'citizenContacts',
    citizenId,
    visitedTabs.has('contacts'),
    getCitizenContacts,
  )
  const documentsQuery = useCitizenSection(
    'citizenDocuments',
    citizenId,
    visitedTabs.has('documents'),
    getCitizenDocuments,
  )

  const [edits, setEdits] = useState<Partial<CitizenDetailsDraft>>({})
  const updateMutation = useUpdateCitizenDetails()
  const fieldHandlers = useDraftFieldHandlers(setEdits, contactsQuery.data)

  const details: CitizenDetailsDraft = {
    ...initialGeneralInfo,
    familyMembers: familyQuery.data,
    education: educationQuery.data,
    contacts: contactsQuery.data,
    documents: documentsQuery.data,
    ...edits,
  }

  const { showErrors, reset, save } = useStableSaveReset(
    citizenId,
    details,
    edits,
    setEdits,
    updateMutation,
  )

  return {
    details,
    isDirty: Object.keys(edits).length > 0,
    showErrors,
    isSaving: updateMutation.isPending,
    isLoading: {
      familyMembers: familyQuery.isLoading,
      education: educationQuery.isLoading,
      contacts: contactsQuery.isLoading,
      documents: documentsQuery.isLoading,
    },
    ...fieldHandlers,
    reset,
    save,
  }
}
