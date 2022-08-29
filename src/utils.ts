export function isValidTimestamp(timestamp: string) {
  const newTimestamp = new Date(timestamp).getTime();
  return isNumeric(newTimestamp);
}

function isNumeric(n: number) {
  return !isNaN(parseFloat(n as unknown as string)) && isFinite(n);
}
