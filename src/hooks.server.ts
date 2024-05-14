import { AppRoute } from '$lib/constants';
import admin from '$lib/firebase/firebase.admin';
import { error, redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import type { DecodedIdToken } from 'firebase-admin/auth';

const authRequiredPaths = new Set([AppRoute.PROFILE]);
const adminRequiredPaths = new Set([AppRoute.ADMIN]);

const isAuthRequiredPath = (path: string) => authRequiredPaths.has(path as AppRoute);
const isAdminRequiredPath = (path: string) => adminRequiredPaths.has(path as AppRoute);

const isAuth = (event: RequestEvent) => event?.locals?.user;
const isAdmin = (event: RequestEvent) => event?.locals?.user?.role === 'admin';

export const handle: Handle = async ({ event, resolve }) => {
  await tryGetCurrentUser(event);
  await tryGetRole(event);
  await checkAccess(event);

  const response = await resolve(event);
  return response;
};

const tryGetCurrentUser = async (event: RequestEvent) => {
  const session = event.cookies.get('session');

  if (!session) return;

  try {
    const decodedClaims: DecodedIdToken = await admin.auth().verifySessionCookie(session, true);

    event.locals.user = decodedClaims;
  } catch (error) {
    console.error(error);
  }
};

const tryGetRole = async (event: RequestEvent) => {
  if (!event.locals.user) return;

  try {
    const user = await admin.auth().getUser(event.locals.user.uid);
    event.locals.role = user.customClaims?.role || 'user';
  } catch (error) {
    console.error(error);
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
