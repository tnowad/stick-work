import type { User } from '$lib/types';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user?: User;
    }
    interface PageData {
      meta: {
        title: string;
        description?: string;
      };
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
