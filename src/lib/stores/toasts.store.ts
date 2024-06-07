import { writable } from 'svelte/store';

export type Toast = {
  id: string;
  title?: string;
  message?: string;
  type: 'info' | 'success' | 'error' | 'warning' | null;
  duration?: number;
  closable: boolean;
};

export function createToaster() {
  const { subscribe, update } = writable<Toast[]>([]);

  function add({
    title = '',
    message = '',
    type = 'info',
    duration = 5000,
    closable = true
  }: Omit<Toast, 'id'>) {
    const id = String(crypto.randomUUID());
    update((toasts) => [
      ...toasts,
      {
        id,
        title,
        message,
        type,
        duration,
        closable
      }
    ]);
    return id;
  }

  return {
    subscribe,
    add,
    remove
  };
}

export const toaster = createToaster();
