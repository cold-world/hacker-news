export function timestampToDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const localDate = new Date(
    date.toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
  );
  const localHours = localDate.getHours().toString().padStart(2, '0');
  const localMinutes = localDate.getMinutes().toString().padStart(2, '0');
  return `${localHours} hours ${localMinutes} minutes`;
}
