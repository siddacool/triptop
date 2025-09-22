<script lang="ts" module>
  export interface SelectOption {
    value: string;
    label: string;
  }

  export interface SelectProps {
    children?: Snippet;
    ref?: HTMLDivElement;
    class?: string;
    value?: string;
    placeholder?: string;
    open?: boolean;
    options: SelectOption[];
    onchange?: (value: string) => void;
    name?: string;
    disabled?: boolean;
    /** is there any associated Error ? */
    error?: boolean;
    /** Icon before button content */
    before?: Snippet;
    /** Icon after button content */
    after?: Snippet;
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';
  import type { Snippet } from 'svelte';
  import { Combobox } from 'bits-ui';
  import './Select.style.scss';
  import Icon from '@iconify/svelte';

  let {
    class: className = '',
    ref = $bindable<HTMLDivElement>(),
    value = $bindable(),
    open = $bindable(false),
    options,
    onchange,
    name,
    disabled = false,
    placeholder,
    error = false,
    before,
    after,
  }: SelectProps = $props();

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );

  let searchValue = $state('');

  const filteredItems = $derived.by(() => {
    if (searchValue === '') return options;
    return options.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase()));
  });

  function handleInput(e: Event & { currentTarget: HTMLInputElement }) {
    searchValue = e.currentTarget.value;
  }

  function handleOpenChange(newOpen: boolean) {
    if (!newOpen) searchValue = '';
  }

  let focused: boolean = $state(false);

  function onfocusMod() {
    focused = true;
    open = true;
  }

  function onblurMod() {
    focused = false;
  }
</script>

<div bind:this={ref} class={['Select', theme, className].join(' ')}>
  <Combobox.Root
    type="single"
    items={options}
    bind:value={value as never}
    bind:open
    onOpenChange={handleOpenChange}
    onValueChange={onchange}
    {name}
    {disabled}
    allowDeselect={false}
    inputValue={options.find((item) => item.value === value)?.label}
    scrollAlignment="center"
  >
    <div
      class={['SelectInputHolder', theme].join(' ')}
      class:error
      class:disabled
      class:focused
      class:open
    >
      <div class="before">
        {@render before?.()}
      </div>
      <Combobox.Input
        oninput={handleInput}
        {placeholder}
        aria-label={placeholder}
        class="SelectInput"
        onfocus={onfocusMod}
        onblur={onblurMod}
      />
      <div class="after">
        {@render after?.()}
      </div>
      <Combobox.Trigger class="SelectTrigger">
        {#if open}
          <Icon icon="material-symbols:arrow-drop-up-rounded" width="28" height="28" />
        {:else}
          <Icon icon="material-symbols:arrow-drop-down-rounded" width="28" height="28" />
        {/if}
      </Combobox.Trigger>
    </div>
    <Combobox.Portal>
      <Combobox.Content class={['SelectContent', 'dodo-shadow-5', theme].join(' ')} sideOffset={10}>
        <Combobox.ScrollUpButton class={['ScrollButton', 'ScrollButtonUp'].join(' ')}>
          <Icon icon="material-symbols:arrow-drop-up-rounded" width="28" height="28" />
        </Combobox.ScrollUpButton>
        <Combobox.Viewport class="SelectViewport">
          {#each filteredItems as item, i (i + item.value)}
            <Combobox.Item {...item} class={['SelectItem', theme].join(' ')}>
              {#snippet children()}
                {item.label}
              {/snippet}
            </Combobox.Item>
          {:else}
            <span class="SelectNotFound"> No results found </span>
          {/each}
        </Combobox.Viewport>
        <Combobox.ScrollDownButton class={['ScrollButton', 'ScrollButtonDown'].join(' ')}>
          <Icon icon="material-symbols:arrow-drop-up-rounded" width="28" height="28" />
        </Combobox.ScrollDownButton>
      </Combobox.Content>
    </Combobox.Portal>
  </Combobox.Root>
</div>
