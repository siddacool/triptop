export function calculatorAmount(amount: string, value: number | string): string {
  const [, decimal = ''] = amount.split('.');

  if (typeof value === 'number') {
    if (amount === '0') {
      return String(value);
    }

    if (decimal.length >= 4) {
      return amount;
    }

    return amount + value;
  }

  switch (value) {
    case '00':
    case '000':
      if (amount === '0') {
        return amount;
      }

      if (amount.includes('.')) {
        return amount;
      }

      return amount + value;

    case 'backspace':
      return amount.slice(0, -1);

    case '.':
      if (amount.includes('.')) {
        return amount;
      }

      return amount + '.';

    case 'clearAll':
      return '0';

    default:
      return amount;
  }
}
