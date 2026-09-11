import { useCallback, useEffect, useRef, useState } from 'react'
import { hasValidationErrors } from '../validateRecordCard'
import type { useUpdateCitizenDetails } from './useUpdateCitizenDetails'
import type { CitizenDetailsDraft } from '@/types/citizen'

interface StableSaveReset {
  showErrors: boolean
  reset: () => void
  save: (onSaved: () => void) => void
}

type UpdateMutation = ReturnType<typeof useUpdateCitizenDetails>

export function useStableSaveReset(
  citizenId: number,
  details: CitizenDetailsDraft,
  edits: Partial<CitizenDetailsDraft>,
  setEdits: (edits: Partial<CitizenDetailsDraft>) => void,
  updateMutation: UpdateMutation,
): StableSaveReset {
  const [showErrors, setShowErrors] = useState(false)

  const latestRef = useRef({ details, edits, citizenId, updateMutation })
  useEffect(() => {
    latestRef.current = { details, edits, citizenId, updateMutation }
  })

  const reset = useCallback(() => {
    setEdits({})
    setShowErrors(false)
  }, [setEdits])

  const save = useCallback(
    (onSaved: () => void) => {
      const latest = latestRef.current
      if (hasValidationErrors(latest.details)) {
        setShowErrors(true)
        return
      }

      latest.updateMutation.mutate(
        { id: latest.citizenId, patch: latest.edits },
        {
          onSuccess: () => {
            setEdits({})
            setShowErrors(false)
            onSaved()
          },
        },
      )
    },
    [setEdits],
  )

  return { showErrors, reset, save }
}
