export function formatList(values: string[] | string | null | undefined): string {
  if (!values) {
    return '';
  }

  if (Array.isArray(values)) {
    return values.filter(Boolean).join(', ');
  }

  return values;
}
