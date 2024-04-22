import admin from '$lib/firebase/firebase.admin';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import type { DecodedIdToken } from 'firebase-admin/auth';

const publicPaths = new Set(['/', '/sign-in', '/sign-up']);
const authRequiredPaths = new Set(['/profile']);
const adminRequiredPaths = new Set(['/admin']);

export const handle: Handle = async ({ event, resolve }) => {
  await tryGetCurrentUser(event);
  await tryGetRole(event);

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
    event.locals.user.role = user.customClaims?.role || 'user';
  } catch (error) {
    console.error(error);
  }
};
