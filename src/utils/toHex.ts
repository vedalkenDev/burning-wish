export function toHex(n: number): string {
  return '0x' + n.toString(16).toUpperCase().padStart(2, '0');
}
