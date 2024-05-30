import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import admin from '$lib/firebase/firebase.admin';

export const actions = {
  async signInWithIdToken({ request, cookies }) {
    const formData = await request.formData();

    const idToken = formData.get('idToken') as string;

    if (!idToken) {
      throw error(400, 'Bad Request');
    }

    const decodedToken = admin.auth().verifyIdToken(idToken);

    const expiresIn = 1000 * 60 * 60 * 24 * 5; // 5 days
    if (new Date().getTime() / 1000 - (await decodedToken).auth_time < 5 * 60) {
      const cookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

      const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };

      cookies.set('session', cookie, options);

      return {
        message: 'Signed in successfully.'
      };
    } else {
      throw error(401, 'Unauthorized');
    }
  }
} satisfies Actions;
