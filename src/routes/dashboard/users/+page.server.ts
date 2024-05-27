import admin from '$lib/firebase/firebase.admin';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const listUser = await admin.auth().listUsers();
  const users = listUser.users.map((user) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    disabled: user.disabled
  }));

  return {
    users,
    meta: {
      title: 'User Management'
    }
  };
};
