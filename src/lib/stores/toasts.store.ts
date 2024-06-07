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

  return {
    subscribe,
  };
}

export const toaster = createToaster();
