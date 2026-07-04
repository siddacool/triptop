export function calculateShare(amount: number, total: number): number {
  return total === 0 ? 0 : amount / total;
}
