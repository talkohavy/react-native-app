export function formatExifDate(raw: string | undefined): string | null {
  if (!raw) return null;

  // EXIF format: "2024:01:15 10:30:00"
  const normalized = raw.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3');
  const date = new Date(normalized);

  if (isNaN(date.getTime())) return null;

  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}
