<script lang="ts">
  import { toaster, type Toast } from '$lib/stores/toasts.store';
  import { onDestroy } from 'svelte';

  let history: Toast[] = $state([]);

  const unsubscribe = toaster.subscribe((t) => {
    history = history.filter((h) => t.some((t) => t.id === h.id));

    const newToasts = t.filter((t) => !history.some((h) => h.id === t.id));

    newToasts.forEach((toast) => {
      history.push(toast);

      if (!toast.duration) return;

      setTimeout(() => {
        toaster.remove(toast.id);
      }, toast.duration);
    });
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

