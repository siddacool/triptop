<script lang="ts" module>
  export interface ButtonToggleOption {
    value: string;
    label: string;
  }

  export interface ButtonToggleProps {
    disabled?: boolean | null | undefined;
    ref?: HTMLDivElement;
    class?: string;
    name: string;
    value?: string;
    onchange?: (value: string) => void;
    options: ButtonToggleOption[];
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';
  import { Label, RadioGroup } from 'bits-ui';

  import './ButtonToggle.style.scss';

  const {
    class: className = '',
    disabled,
    ref = $bindable<HTMLDivElement>(),
    options,
    name,
    onchange,
    value,
  }: ButtonToggleProps = $props();

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );
</script>

<RadioGroup.Root class={['ButtonToggle', theme, className].join(' ')} {ref} {value}>
  {#each options as option, index (option.value)}
    <div class={['ButtonToggleItem', theme, className].join(' ')}>
      <RadioGroup.Item
        class={['ButtonToggleRadio', theme, className].join(' ')}
        id={`${name}-${index}`}
        value={option.value}
        {disabled}
        onclick={() => (onchange ? onchange(option.value) : undefined)}
      />
      <Label.Root
        class={['ButtonToggleLabel', theme, className].join(' ')}
        for={`${name}-${index}`}
      >
        {option.label}
      </Label.Root>
    </div>
  {/each}
</RadioGroup.Root>
