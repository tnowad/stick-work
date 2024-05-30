<script lang="ts">
  import './global.css';
  import { navigating } from '$app/stores';
  import type { LayoutData } from './$types';
  export let data: LayoutData;

  let isNavigating = false;

  navigating.subscribe((value) => {
    if (value) {
      isNavigating = true;
    } else {
      isNavigating = false;
    }
  });
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <link rel="preload" href="/loading.gif" as="image" />
</svelte:head>

{#if isNavigating}
  <span class="fixed bottom-0 right-0 m-4">
    <img src="/loading.gif" class="w-20 h-20" alt="loading" />
  </span>
{/if}

<slot />
