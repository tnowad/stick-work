import { Action, Subject } from '$lib/abilities/define.ability';
import { StatusCodes } from 'http-status-codes';
import type { Actions } from './$types';
import { AppRoute } from '$lib/constants';

export const actions: Actions = {
  default: async ({ locals, cookies }) => {
    const ability = locals.ability;

    if (!ability.can(Action.DELETE, Subject.AUTH)) {
      return {
        status: StatusCodes.UNAUTHORIZED,
        redirect: AppRoute.AUTH_SIGN_IN
      };
    }

    cookies.delete('session', { path: '/' });
  }
};
