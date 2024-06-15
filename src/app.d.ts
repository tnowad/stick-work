import type { User } from '$lib/types';
import { AbilityTuple, MongoAbility, MongoQuery } from '@casl/ability';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user?: User;
      ability: MongoAbility<AbilityTuple, MongoQuery>;
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
