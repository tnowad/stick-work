import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
  return {
    meta: {
      title: 'Stick Work'
    },
    user: locals.user
  };
};
