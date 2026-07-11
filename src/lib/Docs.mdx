# App Architecture

This project follows a **feature-first** architecture.

Each feature owns its UI, state, business logic, database access, validation, and types.

## Project Structure

```text
src/
└── lib/
       ├── features/
       │   ├── expense/
       │   ├── trip/
       │   ├── participant/
       │   ├── category/
       │   ├── settlement/
       │   └── statistics/
       │
       ├── shared/
       │   ├── components/
       │   ├── utils/
       │   ├── config/
       │   ├── constants/
       │   └── types/
       │
       └── db/
```

## Feature Structure

```text
expense/
│
├── api/
├── db/
├── logic/
├── store/
├── validation/
├── types/
├── constants/
├── config/
├── mocks/
├── components/
└── index.ts

```

---

## Folder Responsibilities

### api/

Talks to external APIs only.

Examples

```ts
searchExchangeRates();
fetchReceiptOCR();
syncExpenses();
```

Never

- Update stores
- Access IndexedDB
- Validate data

---

### db/

Responsible for IndexedDB / Dexie.

Examples

```ts
createExpense();
updateExpense();
deleteExpense();
listExpenses();
```

Never

- Fetch APIs
- Show toasts
- Navigate
- Validate

---

### logic/

Coordinates business workflows.

Example

```text
Save Expense
↓
Validate
↓
Save Expense
↓
Update Trip Totals
↓
Refresh Store
```

Example

```ts
saveExpense();
duplicateExpense();
splitExpense();
mergeExpenses();
```

Never

- Render UI
- Query components

---

### store/

Owns reactive application state.

Examples

```ts
expenses;
selectedExpense;
loading;
filters;
sortedExpenses;
```

Never

- Fetch APIs
- Access Dexie directly
- Validate

---

### validation/

Pure validation only.

Examples

```ts
validateExpense();
validateTrip();
validateReceipt();
```

Never

- Save data
- Modify state

---

### types/

Feature-specific interfaces.

Examples

```ts
Expense;
ExpenseInput;
ExpenseFilters;
```

Nothing else.

---

### constants/

Feature-wide constant values.

Examples

```ts
MAX_EXPENSE_AMOUNT;
DEFAULT_CURRENCY;
DEFAULT_PAGE_SIZE;
EXPENSE_LIMIT;
```

Constants are simple immutable values.

If the object contains labels, icons, metadata or configuration,
it probably belongs in **config/** instead.

---

### config/

Feature configuration.

Contains data that configures how the feature behaves.

Examples

```ts
categoryOptions;
currencyOptions;
expenseFormConfig;
expenseFilters;
chartConfig;
```

Typical example

```ts
export const categoryOptions = [
  {
    value: Category.FOOD,
    label: 'Food',
    icon: 'proicons:food',
  },
];
```

Use config for

- Select options
- Labels
- Icons
- Form configuration
- Table column definitions
- Filter definitions
- Chart configuration

Never

- Store business logic
- Save data
- Fetch APIs

---

### mocks/

Development-only data.

Examples

```ts
mockExpense;
mockTrip;
mockReceipt;
```

Used for

- Storybook

- Testing

- Development

---

### components/

Feature UI.

Example

```text
ExpenseCard/
ExpenseForm/
ExpenseFilters/
ExpenseSummary/
ExpenseList/
```

Each component can contain

```text
ExpenseCard/
ExpenseCard.svelte
ExpenseCard.stories.ts
ExpenseCard.test.ts
ExpenseCard.mock.ts
index.ts
```

## Shared Folder

Contains code used by multiple features.

```text
shared/
components/
utils/
options/
constants/
types/
```

---

### shared/components/

Reusable UI.

Examples

```text
Button
Modal
Dialog
Select
DatePicker
CurrencyInput
```

---

### shared/config/

Shared configuration used across multiple features.

Examples

```ts
currencyOptions;
countryOptions;
languageOptions;
themeOptions;
dateFormats;
```

Examples of things that belong here

- Dropdown options
- Navigation menus
- Theme configuration
- Locale configuration
- Reusable table columns

---

### shared/constants/

Application-wide constants.

Examples

```ts
APP_NAME;
DATE_FORMAT;
DEFAULT_PAGE_SIZE;
```

---

### shared/utils/

Pure helper functions.

Examples

```ts
formatCurrency();
formatDate();
generateId();
groupBy();
```

---

### shared/types/

Application-wide types.

Examples

```ts
ApiResponse;
Pagination;
SortDirection;
```

---

## Data Flow

Creating an Expense

```text
User
↓
ExpenseForm
↓
logic.saveExpense()
↓
validation.validateExpense()
↓
db.createExpense()
↓
store.refresh()
↓
UI Updates
```

---

## Rules

✅ Organize by feature.
✅ One responsibility per folder.
✅ Components render UI.
✅ Store owns reactive state.
✅ Logic coordinates workflows.
✅ DB talks to IndexedDB.
✅ API talks to the network.
✅ Validation is pure.
✅ Types contain interfaces only.
✅ Constants contain fixed values.

## Growing a Folder

Start

```text

logic/

index.ts

```

Later

```text
logic/
index.ts
crud.ts
settlement.ts
reports.ts
sync.ts
```

Split by **responsibility**, not by file size.

---

## Import Style

```ts
import { saveExpense } from '$lib/features/expense/logic';

import { createExpense } from '$lib/features/expense/db';

import { validateExpense } from '$lib/features/expense/validation';

import { expenseStore } from '$lib/features/expense/store';
```

---

## Quick Decision Guide

Need UI?

→ components/

Need reactive state?

→ store/

Need IndexedDB?

→ db/

Need business workflow?

→ logic/

Need validation?

→ validation/

Need interfaces?

→ types/

Need constants?

→ constants/

Need API calls?

→ api/

Need Storybook/Test data?

→ mocks/

Need something shared by multiple features?

→ shared/
