import { AppRoute } from '$lib/constants';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  redirect(302, AppRoute.DASHBOARD_USER_MANAGEMENT);
};
