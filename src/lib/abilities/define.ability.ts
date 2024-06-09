import type { User } from '$lib/types';
import { Role } from '$lib/types/user.type';
import { defineAbility } from '@casl/ability';

enum Actions {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete'
}

enum Subjects {
  DASHBOARD = 'dashboard',
  CALENDAR = 'calendar',
  EVENT = 'event',
  USER = 'user',
  ROLE = 'role'
}

export const defineAbilitiesForUser = (user?: User) => {
  return defineAbility((can) => {
    if (!user) {
      return;
    }

    switch (user.role) {
      case Role.ADMIN:
        can(Actions.MANAGE, Subjects.DASHBOARD);
        can(Actions.MANAGE, Subjects.USER);
        can(Actions.MANAGE, Subjects.ROLE);
        can(Actions.MANAGE, Subjects.CALENDAR);
        can(Actions.MANAGE, Subjects.EVENT);
        break;
      case Role.USER:
        can([Actions.READ, Actions.UPDATE, Actions.DELETE], [Subjects.CALENDAR, Subjects.EVENT], {
          userId: user.uid
        });
        break;
    }
    can([Actions.READ, Actions.UPDATE], Subjects.USER, { uid: user.uid });
  });
};
