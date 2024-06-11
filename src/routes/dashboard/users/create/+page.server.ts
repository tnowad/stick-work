import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    return {
      status: 401,
      error: new Error('Unauthorized')
    };
  }

  // load some things to create user like roles, permissions, etc.
  return {
    meta: {
      title: 'Create User'
    }
  };
};
