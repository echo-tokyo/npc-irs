export type FormFieldType =
  | 'text'
  | 'multiline'
  | 'select'
  | 'date'
  | 'checkbox'
  | 'radio'
  | 'multiselect'

export type FormFieldValue = string | boolean | string[]

export interface FormFieldOption {
  value: string
  label: string
}

export interface FormFieldConfig {
  name: string
  label: string
  type: FormFieldType
  options?: FormFieldOption[]
  validate?: (value: FormFieldValue) => string | undefined
}
