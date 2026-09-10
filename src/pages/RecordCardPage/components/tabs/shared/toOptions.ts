import type { FormFieldOption } from '@/types/formField'

export function toOptions(labels: Record<string, string>): FormFieldOption[] {
  return Object.entries(labels).map(([value, label]) => ({ value, label }))
}
