import admin from '$lib/firebase/firebase.admin';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const listUser = await admin.auth().listUsers();
  const users = listUser.users.map((user) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    disabled: user.disabled
  }));

  return {
    users
  };
};
