import type { Action, Subject } from '$lib/abilities/define.ability';
import type { AppRoute } from '$lib/constants';

export type RouteConfigs = {
  subject: Subject;
  action: Action;
  onReject?: <T = void>() => T | Promise<T>;
  onResolve?: <T = void>() => T | Promise<T>;
};

export type AppRoutesConfigs = Record<AppRoute, RouteConfigs>;
