import type { FormFieldConfig, FormFieldValue } from '@/types/formField'

type Validator = (value: FormFieldValue) => string | undefined

export function required(value: FormFieldValue): string | undefined {
  if (typeof value === 'string' && value.trim() === '') {
    return 'Обязательное поле'
  }
  return undefined
}

export function phone(value: FormFieldValue): string | undefined {
  if (typeof value !== 'string' || value.trim() === '') return undefined
  const digitsCount = value.replace(/\D/g, '').length
  return digitsCount >= 11 ? undefined : 'Некорректный номер телефона'
}

export function email(value: FormFieldValue): string | undefined {
  if (typeof value !== 'string' || value.trim() === '') return undefined
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? undefined
    : 'Некорректный email'
}

export function snils(value: FormFieldValue): string | undefined {
  if (typeof value !== 'string' || value.trim() === '') return undefined
  return /^\d{3}-\d{3}-\d{3} \d{2}$/.test(value)
    ? undefined
    : 'Формат: 000-000-000 00'
}

export function inn(value: FormFieldValue): string | undefined {
  if (typeof value !== 'string' || value.trim() === '') return undefined
  return /^\d{10}(\d{2})?$/.test(value)
    ? undefined
    : 'ИНН должен содержать 10 или 12 цифр'
}

export function notFutureDate(value: FormFieldValue): string | undefined {
  if (typeof value !== 'string' || value.trim() === '') return undefined
  const today = new Date().toISOString().slice(0, 10)
  return value > today ? 'Дата не может быть в будущем' : undefined
}

export function combine(...validators: Validator[]): Validator {
  return (value) => {
    for (const validate of validators) {
      const error = validate(value)
      if (error) return error
    }
    return undefined
  }
}

export function validateFields(
  fields: FormFieldConfig[],
  values: Record<string, FormFieldValue>,
): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const field of fields) {
    if (!field.validate) continue
    const error = field.validate(values[field.name])
    if (error) errors[field.name] = error
  }

  return errors
}

export function hasErrors(errors: Record<string, string>): boolean {
  return Object.keys(errors).length > 0
}

export function asFieldValues(value: object): Record<string, FormFieldValue> {
  return value as Record<string, FormFieldValue>
}
