import { AppRoute } from '$lib/constants';
import admin from '$lib/firebase/firebase.admin';
import type { User } from '$lib/types';
import { error, redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import type { DecodedIdToken } from 'firebase-admin/auth';
import NodeCache from 'node-cache';

const authRequiredPaths = new Set([
  AppRoute.PROFILE,
  AppRoute.SETTINGS,
  AppRoute.SCHEDULE,
  AppRoute.AUTH_SIGN_OUT
]);
const adminRequiredPaths = new Set([AppRoute.DASHBOARD, AppRoute.DASHBOARD_USER_MANAGEMENT]);

const isAuthRequiredPath = (path: string) => authRequiredPaths.has(path as AppRoute);
const isAdminRequiredPath = (path: string) => adminRequiredPaths.has(path as AppRoute);

const isAuth = (event: RequestEvent) => event?.locals?.user;
const isAdmin = (event: RequestEvent) => event?.locals?.user?.role === 'admin';

const userCache = new NodeCache({ stdTTL: 60 * 10 });

export const handle: Handle = async ({ event, resolve }) => {
  await tryGetCurrentUser(event);
  await checkAccess(event);

  return await resolve(event);
};

const tryGetCurrentUser = async (event: RequestEvent) => {
  const session = event.cookies.get('session');

  if (!session) return;

  const cachedUser = userCache.get<User>(session);
  if (cachedUser) {
    event.locals.user = cachedUser;
    return;
  }

  try {
    const decodedClaims: DecodedIdToken = await admin.auth().verifySessionCookie(session, true);
    const user = await admin.auth().getUser(decodedClaims.uid);
    const role = user.customClaims?.role || 'user';
    event.locals.user = { ...decodedClaims, role };

    userCache.set(session, decodedClaims);
  } catch (error) {
    console.error('Error verifying session cookie:', error);
  }
};

const checkAccess = async (event: RequestEvent) => {
  if (isAuthRequiredPath(event.url.pathname) && !isAuth(event)) {
    throw redirect(302, AppRoute.AUTH_SIGN_IN);
  }

  if (isAdminRequiredPath(event.url.pathname) && !isAdmin(event)) {
    throw error(403, 'Forbidden');
  }
};
