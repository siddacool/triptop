import currencyCodesJson from './currency-codes.json';

type CurrencyCodeRaw = {
  entity: string;
  currency: string;
  alphabeticcode: string | null;
  numericcode: string | null;
  minorunit: string | null;
  withdrawaldate: string | null;
};

const currencyCodesRaw = currencyCodesJson as CurrencyCodeRaw[];

export type CurrencyCode = {
  entity: string;
  currency: string;
  alphabeticCode: string;
  numericCode: number;
};

function generateFormatedCurrencyCodes() {
  const filtredCurrency: CurrencyCode[] = [];

  for (let index = 0; index < currencyCodesRaw.length; index++) {
    const element = currencyCodesRaw[index];

    if (!element.alphabeticcode || !element.numericcode || element.withdrawaldate) {
      continue;
    }

    if (filtredCurrency.some((item) => item.alphabeticCode === element.alphabeticcode)) {
      continue;
    }

    filtredCurrency.push({
      entity: element.entity,
      currency: element.currency,
      alphabeticCode: element.alphabeticcode,
      numericCode: Number(element.numericcode),
    });
  }

  return filtredCurrency.sort((a, b) => a.currency.localeCompare(b.currency));
}

export const currencyCodes = generateFormatedCurrencyCodes();
