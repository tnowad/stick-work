<script lang="ts">
  import Navbar from '$lib/components/navbar.svelte';

  const { data, children } = $props();
</script>

<Navbar user={data.user} menuItems={data.menuItems} />

{@render children()}
