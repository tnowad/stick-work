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
</svelte:head>

{#if isNavigating}
  <span class="loading loading-ring loading-lg fixed bottom-0 right-0 m-4"></span>
{/if}

<Navbar user={data.user} role={data.role} />

<slot />
