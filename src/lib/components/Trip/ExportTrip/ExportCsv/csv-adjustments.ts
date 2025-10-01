import { replaceCommasWithDots } from '$lib/helpers/text-manipulations/replace-commas-with-dots';
import {
  Category,
  categoryOptions,
  PaymentModes,
  paymentModesOptions,
  type Expense,
} from '$lib/stores/expense/individual.svelte';
import { getCurrencyWiseTotal } from '$lib/stores/expense/list.svelte';
import { getMoment } from '@flightlesslabs/utils';

export function makeTripExportCsv(expensesData: Expense[]) {
  let csv = `Name,Currency,Amount,Payment Mode,Category,Date,Time\n`;

  expensesData.forEach((item) => {
    const paymentMode =
      paymentModesOptions.find((option) => option.value === item.paymentMode) ||
      paymentModesOptions.find((option) => option.value === PaymentModes.CASH);

    const category =
      categoryOptions.find((option) => option.value === item.category) ||
      categoryOptions.find((option) => option.value === Category.OTHER);

    const name = `${replaceCommasWithDots(item.name)}`;
    const time = `${getMoment(item.date).format('hh:mm a')}`;
    const date = `${getMoment(item.date).format('DD-MM-YYYY')}`;

    csv += `${name},${item.currency},${item.amount},${paymentMode?.label},${category?.label},${date},${time}\n`;
  });

  csv += `\n\n`;

  const currencyWiseTotal = getCurrencyWiseTotal(expensesData);

  currencyWiseTotal.forEach((item) => {
    csv += `,${item.currency},${item.total}\n`;
  });

  return csv;
}
