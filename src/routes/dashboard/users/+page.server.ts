import { Action, Subject, defineAbilitiesForUser } from '$lib/abilities/define.ability';
import admin from '$lib/firebase/firebase.admin';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const ability = defineAbilitiesForUser(locals.user);

  if (!ability.can(Action.MANAGE, Subject.USER)) {
    return {
      status: 403,
      error: new Error('Forbidden')
    };
  }

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
