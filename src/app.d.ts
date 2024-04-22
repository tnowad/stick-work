import type { DecodedIdToken } from 'firebase-admin/auth';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user?: DecodedIdToken;
      role?: 'admin' | 'user';
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
