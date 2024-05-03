import type { Actions } from './$types';

export const actions = {
  default: async ({ cookies }) => {
    cookies.delete('session', { path: '/' });
  }
} satisfies Actions;
