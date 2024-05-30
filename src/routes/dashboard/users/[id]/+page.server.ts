import admin from '$lib/firebase/firebase.admin';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { id } = params;

  const user = await admin.auth().getUser(id);

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
      customClaims
    },
    meta: {
      title: 'User Management'
    }
  };
};
