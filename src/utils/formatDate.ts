export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('ru-RU')
}
