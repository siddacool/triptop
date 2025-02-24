const PREFIX = 'SILK_COUNT';

export function generateCookieName(name: string) {
  return `${PREFIX}_${name}`;
}
