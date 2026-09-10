import type { CitizenStatus, Gender } from '@/services/citizensService'

export const STATUS_LABELS: Record<CitizenStatus, string> = {
  active: 'Действует',
  archived: 'Архив',
  pending: 'На рассмотрении',
}

export const GENDER_LABELS: Record<Gender, string> = {
  male: 'Мужской',
  female: 'Женский',
}
