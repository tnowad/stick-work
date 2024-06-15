import { Action, Subject } from '$lib/abilities/define.ability';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { StatusCodes } from 'http-status-codes';

export const load: LayoutServerLoad = async ({ locals }) => {
  const ability = locals.ability;

  if (!ability.can(Action.READ, Subject.DASHBOARD)) {
    return error(StatusCodes.FORBIDDEN, 'You are not allowed to access this page');
  }

  const sidebarMenuItems: unknown[] = [];
  const dashboardMenuItems: unknown[] = [];

  return {
    sidebarMenuItems,
    dashboardMenuItems
  };
};
