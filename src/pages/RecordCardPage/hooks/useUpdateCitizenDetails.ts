import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCitizenDetails } from '@/services/citizensService'

export function useUpdateCitizenDetails() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCitizenDetails,
    onSuccess: (details) => {
      queryClient.setQueryData(['citizenDetails', details.id], details)
    },
  })
}
