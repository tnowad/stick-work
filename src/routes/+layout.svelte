<script lang="ts">
  import { navigating } from '$app/stores';
  import Navbar from '$lib/components/navbar.svelte';
  import type { LayoutData } from './$types';
  import './global.css';
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

<Navbar user={data.user} role={data.role} />

<slot />
