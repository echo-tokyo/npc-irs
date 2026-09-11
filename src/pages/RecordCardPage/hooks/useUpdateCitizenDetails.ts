import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCitizenDetails } from '@/services/citizenDetailsService'
import type { CitizenDetails } from '@/types/citizen'

interface UpdateCitizenDetailsArgs {
  id: number
  patch: Partial<Omit<CitizenDetails, 'id'>>
}

export function useUpdateCitizenDetails() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, patch }: UpdateCitizenDetailsArgs) =>
      updateCitizenDetails(id, patch),
    onSuccess: (updated) => {
      const { familyMembers, education, contacts, documents, ...generalInfo } =
        updated

      queryClient.setQueryData(['citizenGeneralInfo', updated.id], generalInfo)
      queryClient.setQueryData(
        ['citizenFamilyMembers', updated.id],
        familyMembers,
      )
      queryClient.setQueryData(['citizenEducation', updated.id], education)
      queryClient.setQueryData(['citizenContacts', updated.id], contacts)
      queryClient.setQueryData(['citizenDocuments', updated.id], documents)
    },
  })
}
