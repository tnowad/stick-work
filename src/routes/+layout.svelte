<script lang="ts">
  import Navbar from '$lib/components/navbar.svelte';
  import type { LayoutData } from './$types';
  import './global.css';
  export let data: LayoutData;
</script>

<svelte:head>
  <title>{data.meta.title}</title>
</svelte:head>

<Navbar user={data.user} role={data.role} />

<slot />
