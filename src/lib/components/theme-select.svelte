<script lang="ts">
  import Icon from '@iconify/svelte';
  import { cn } from '$lib/utils/classname.util';
  import { onMount } from 'svelte';
  import { Theme } from '$lib/constants';
  const COLOR_THEME_KEY = 'color-theme';

  let currentTheme = $state(Theme.LIGHT);

  const handleToggleTheme = () => {
    currentTheme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    localStorage.setItem(COLOR_THEME_KEY, currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
  };

  onMount(() => {
    const theme = localStorage.getItem(COLOR_THEME_KEY);
    if (theme && Object.values(Theme).includes(theme as Theme)) {
      currentTheme = theme as Theme;
      document.documentElement.setAttribute('data-theme', theme);
    }
  });
</script>

<button
  aria-label={currentTheme === Theme.LIGHT ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
  class={cn('btn btn-sm btn-circle btn-ghost swap swap-rotate', {
    'swap-active': currentTheme === Theme.LIGHT
  })}
  onclick={handleToggleTheme}
>
  <Icon icon="heroicons:sun" class="w-5 h-5 swap-on" />
  <Icon icon="heroicons:moon" class="w-5 h-5 swap-off" />
</button>
