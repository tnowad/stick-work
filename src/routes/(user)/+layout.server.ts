import { Action, Subject } from '$lib/abilities/define.ability';
import type { MenuItem } from '$lib/components/navbar';
import { AppRoute } from '$lib/constants';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const ability = locals.ability;

  const menuItems: MenuItem[] = [];

  ability.can(Action.READ, Subject.CALENDAR) &&
    menuItems.push({
      href: AppRoute.SCHEDULE,
      title: 'Schedule',
      icon: 'heroicons:table-cells',
      badge: 'New'
    });
  ability.can(Action.READ, Subject.USER) &&
    menuItems.push({ href: AppRoute.PROFILE, title: 'Profile', icon: 'heroicons:user' });
  ability.can(Action.READ, Subject.USER_SETTING) &&
    menuItems.push({ href: AppRoute.SETTINGS, title: 'Settings', icon: 'heroicons:cog' });
  ability.can(Action.MANAGE, Subject.DASHBOARD) &&
    menuItems.push({ href: AppRoute.DASHBOARD, title: 'Dashboard', icon: 'heroicons:chart-pie' });
  ability.can(Action.READ, Subject.AUTHENTICATED) &&
    menuItems.push({
      href: AppRoute.AUTH_SIGN_OUT,
      title: 'Logout',
      icon: 'heroicons:arrow-left-start-on-rectangle'
    });

  return {
    menuItems
  };
};
