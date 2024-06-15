import type { User } from '$lib/types';
import { Role } from '$lib/types/user.type';
import { defineAbility } from '@casl/ability';

export enum Action {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete'
}

export enum Subject {
  PUBLIC = 'public',
  AUTHENTICATED = 'authenticated',

  AUTH = 'auth',
  DASHBOARD = 'dashboard',
  CALENDAR = 'calendar',
  EVENT = 'event',
  USER = 'user',
  USER_SETTING = 'user-setting',
  ROLE = 'role'
}

export const defineAbilitiesForUser = (user?: User) => {
  return defineAbility((can) => {
    can(Action.READ, Subject.PUBLIC);

    if (!user) {
      return;
    }

    can(Action.READ, Subject.AUTHENTICATED);
    can([Action.READ, Action.UPDATE], Subject.USER, { uid: user.uid });
    can(Action.READ, Subject.USER_SETTING);

    switch (user.role) {
      case Role.ADMIN:
        can(Action.MANAGE, Subject.DASHBOARD);
        can(Action.MANAGE, Subject.USER);
        can(Action.MANAGE, Subject.ROLE);
        can(Action.MANAGE, Subject.CALENDAR);
        can(Action.MANAGE, Subject.EVENT);
        break;
      case Role.USER:
        can([Action.READ, Action.UPDATE, Action.DELETE], [Subject.CALENDAR, Subject.EVENT], {
          userId: user.uid
        });
        break;
    }
  });
};
