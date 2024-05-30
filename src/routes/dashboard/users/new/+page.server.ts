import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
  // load some things to create user like roles, permissions, etc.
  return {
    meta: {
      title: 'Create User'
    }
  };
};
