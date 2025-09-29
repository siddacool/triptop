<script lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import Card from '$lib/ui-lib/Card/Card.svelte';
  import { Column, Grid } from '@flightlesslabs/grid';
  import TextInput from '$lib/ui-lib/TextInput';
  import type { EventHandler } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import Button from '$lib/ui-lib/Button';
  import Message from '$lib/ui-lib/Message/Message.svelte';
  import type { CreateExpenseFormData } from '$lib/stores/expense/create.svelte';
  import NumericInput from '$lib/ui-lib/NumericInput/NumericInput.svelte';
  import Currency from './Currency.svelte';
  import PaymentMode from './PaymentMode.svelte';
  import Category from './Category.svelte';
  import ExpenseDate from './ExpenseDate.svelte';
  import FormCardDivider from '$lib/components/FormCardDivider.svelte';
  import SuperInput from '$lib/components/SuperInput.svelte';
  import { getCurrencySymbol } from '@flightlesslabs/number-format';
  import Icon from '@iconify/svelte';

  interface EditExpenseProps {
    onsubmit: EventHandler<SubmitEvent, HTMLFormElement>;
    header?: Snippet;
    formData?: CreateExpenseFormData;
    errorMessage?: string;
    loading?: boolean;
    createNew?: boolean;
    onchange: (e: Event, value?: string) => void;
    ondelete?: () => void;
  }

  const {
    onsubmit,
    header,
    formData,
    errorMessage,
    loading = false,
    createNew = false,
    onchange,
    ondelete,
  }: EditExpenseProps = $props();

  const disabled = $derived(
    loading || !formData?.name?.trim() || !formData?.amount || !formData?.currency ? true : false,
  );
</script>

<div class="EditExpense">
  <Card>
    <form {onsubmit}>
      <Grid spacing={2}>
        {#if header}
          <Column>
            {@render header?.()}
          </Column>
        {/if}
        <Column>
          <Grid spacing={1}>
            <Column>
              <SuperInput>
                <TextInput
                  name="name"
                  id="name"
                  placeholder="Expense Name"
                  value={formData?.name}
                  oninput={(e) => onchange(e)}
                  class="ExpenseName"
                />
              </SuperInput>
            </Column>
            <Column>
              <SuperInput>
                <NumericInput
                  name="amount"
                  id="amount"
                  placeholder="Amount"
                  value={formData?.amount}
                  class="Amount"
                  decimalPlaces={2}
                  formatCurrency
                  onValueChange={(value) => (onchange as any)('amount', value)}
                  prefix={formData?.currency && getCurrencySymbol(formData.currency)
                    ? getCurrencySymbol(formData.currency)
                    : ''}
                  allowNegative
                />
              </SuperInput>
            </Column>
            <FormCardDivider />
            <Currency
              {formData}
              onchange={(name: string, value: string) => (onchange as any)(name, value)}
            />
            <PaymentMode
              {formData}
              onchange={(name: string, value: string) => (onchange as any)(name, value)}
            />
            <Category
              {formData}
              onchange={(name: string, value: string) => (onchange as any)(name, value)}
            />
            <ExpenseDate
              {formData}
              onchange={(name: string, value: string) => (onchange as any)(name, value)}
            />
            <Column></Column>
            <Column>
              <div class="Control">
                {#if createNew}
                  <Button type="submit" {disabled} name="save" color="secondary">Add</Button>
                {:else}
                  <Button type="submit" {disabled} name="save" color="secondary">Save</Button>
                  <Button
                    {disabled}
                    name="save"
                    color="danger"
                    class="Delete"
                    onclick={ondelete}
                    compact
                    aria-label="Delete Expense"
                  >
                    <Icon icon="material-symbols:delete-outline" width="24" height="24" />
                  </Button>
                {/if}
              </div>
            </Column>
            {#if errorMessage}
              <Message color="danger">
                {errorMessage}
              </Message>
            {/if}
          </Grid>
        </Column>
      </Grid>
    </form>
  </Card>
</div>

<style lang="scss">
  .EditExpense {
    form {
      display: block;
    }

    :global(.Control) {
      display: flex;
      justify-content: space-between;
    }

    :global(.Delete) {
      margin-left: auto;
    }
  }
</style>
