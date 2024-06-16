import admin from '$lib/firebase/firebase.admin';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    return;
  }
  const user = await admin.auth().getUser(locals.user.uid);

  const { uid, email, displayName, photoURL, disabled, phoneNumber, emailVerified, customClaims } =
    user;

  return {
    user: {
      uid,
      email,
      displayName,
      photoURL,
      disabled,
      phoneNumber,
      emailVerified,
      role: customClaims?.role || 'user',
      customClaims
    },
    meta: {
      title: 'Profile'
    }
  };
};
