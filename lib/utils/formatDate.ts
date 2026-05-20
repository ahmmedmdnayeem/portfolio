export function formatDate(date: string | Date | null, opts?: Intl.DateTimeFormatOptions): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', opts ?? { year: 'numeric', month: 'short' });
}

export function formatDateRange(start: string, end: string | null): string {
  const s = formatDate(start);
  const e = end ? formatDate(end) : 'Present';
  return `${s} — ${e}`;
}