import admin from '$lib/firebase/firebase.admin';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import type { DecodedIdToken } from 'firebase-admin/auth';

export const handle: Handle = async ({ event, resolve }) => {
  await tryGetCurrentUser(event);

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
