import type { ChipProps } from '@mui/material/Chip'
import type {
  BenefitCategory,
  CitizenStatus,
  Citizenship,
  DocumentType,
  EducationLevel,
  Gender,
  MaritalStatus,
  PreferredContactMethod,
  Relationship,
} from '@/types/citizen'

export const STATUS_LABELS: Record<CitizenStatus, string> = {
  active: 'Действует',
  archived: 'Архив',
  pending: 'На рассмотрении',
}

export const STATUS_CHIP_COLORS: Record<CitizenStatus, ChipProps['color']> = {
  active: 'success',
  archived: 'default',
  pending: 'warning',
}

export const GENDER_LABELS: Record<Gender, string> = {
  male: 'Мужской',
  female: 'Женский',
}

export const MARITAL_STATUS_LABELS: Record<MaritalStatus, string> = {
  single: 'Не женат / не замужем',
  married: 'Женат / замужем',
  divorced: 'В разводе',
  widowed: 'Вдовец / вдова',
}

export const CITIZENSHIP_LABELS: Record<Citizenship, string> = {
  ru: 'Российская Федерация',
  foreign: 'Иностранное гражданство',
  stateless: 'Без гражданства',
}

export const BENEFIT_CATEGORY_LABELS: Record<BenefitCategory, string> = {
  veteran: 'Ветеран',
  disabled: 'Инвалид',
  largeFamily: 'Многодетная семья',
  lowIncome: 'Малоимущая семья',
  pensioner: 'Пенсионер',
}

export const RELATIONSHIP_LABELS: Record<Relationship, string> = {
  spouse: 'Супруг(а)',
  child: 'Ребёнок',
  parent: 'Родитель',
  sibling: 'Брат / сестра',
  other: 'Другое',
}

export const EDUCATION_LEVEL_LABELS: Record<EducationLevel, string> = {
  secondary: 'Среднее',
  vocational: 'Среднее специальное',
  higher: 'Высшее',
  postgraduate: 'Послевузовское',
}

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  passport: 'Паспорт',
  snils: 'СНИЛС',
  inn: 'ИНН',
  birthCertificate: 'Свидетельство о рождении',
  driverLicense: 'Водительское удостоверение',
}

export const PREFERRED_CONTACT_METHOD_LABELS: Record<
  PreferredContactMethod,
  string
> = {
  phone: 'Телефон',
  email: 'Email',
  mail: 'Почта',
}
