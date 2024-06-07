<script lang="ts">
  import { toaster, type Toast } from '$lib/stores/toasts.store';
  import { cn } from '$lib/utils/classnames';
  import Icon from '@iconify/svelte';
  import { onDestroy } from 'svelte';

  const TOAST_TYPES = {
    info: {
      class: 'alert-info',
      icon: 'heroicons:information-circle'
    },
    success: {
      class: 'alert-success',
      icon: 'heroicons:check-circle'
    },
    warning: {
      class: 'alert-warning',
      icon: 'heroicons:exclamation-circle'
    },
    error: {
      class: 'alert-error',
      icon: 'heroicons:x-circle'
    }
  };

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

<div class="toast">
  {#each $toaster as toast (toast.id)}
    <div
      class={cn(
        'max-w-sm alert whitespace-normal text-white',
        toast.type && TOAST_TYPES[toast.type].class
      )}
    >
      {#if toast.type}
        <Icon icon={TOAST_TYPES[toast.type].icon} class="w-6 h-6" />
      {/if}
      <div>
        {#if toast.title}
          <h3 class="font-bold">{toast.title}</h3>
        {/if}

        <span class={toast.title ? 'text-sm' : ''}>
          {#each (toast.message ?? '').split('\n') as line}
            {line}<br />
          {/each}
        </span>
      </div>
      {#if toast.closable}
        <button
          class="btn btn-sm btn-circle btn-ghost"
          onclick={() => toaster.remove(toast.id)}
          onkeydown={() => toaster.remove(toast.id)}
        >
          <Icon icon="heroicons:x-mark" class="w-5 h-5" />
        </button>
      {/if}
    </div>
  {/each}
</div>
