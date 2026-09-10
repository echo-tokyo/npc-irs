export const TABS = [
  { value: 'general', label: 'Основные сведения' },
  { value: 'family', label: 'Члены семьи' },
  { value: 'education', label: 'Образование' },
  { value: 'contacts', label: 'Контакты' },
  { value: 'documents', label: 'Документы' },
] as const

export type TabValue = (typeof TABS)[number]['value']
