import { defineAbilitiesForUser } from '$lib/abilities/define.ability';
import { appRoutesConfigs } from '$lib/constants';
import admin from '$lib/firebase/firebase.admin';
import type { User } from '$lib/types';
import { getRouteConfigs } from '$lib/utils/route.util';
import { error, redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import type { DecodedIdToken } from 'firebase-admin/auth';
import NodeCache from 'node-cache';

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
  const user = event.locals.user;

  const ability = defineAbilitiesForUser(user);

  const routeConfigs = getRouteConfigs(appRoutesConfigs, event.url.pathname, event.params);

  if (!routeConfigs) {
    return;
  }

  const canAccess = ability.can(routeConfigs.action, routeConfigs.subject);
  if (!canAccess) {
    if (routeConfigs.onReject) {
      await routeConfigs.onReject();
    } else {
      return error(403, 'Forbidden');
    }
  }
};
