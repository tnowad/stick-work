import { redirect } from '@sveltejs/kit';
import { Action, Subject } from './abilities/define.ability';
import type { AppRoutesConfigs } from './types';
import { StatusCodes } from 'http-status-codes';

export enum AppRoute {
  HOME = '/',
  PROFILE = '/profile',
  SETTINGS = '/settings',
  SCHEDULE = '/schedule',

  AUTH_SIGN_IN = '/auth/sign-in',
  AUTH_SIGN_UP = '/auth/sign-up',
  AUTH_SIGN_OUT = '/auth/sign-out',
  AUTH_FORGOT_PASSWORD = '/auth/forgot-password',

  DASHBOARD = '/dashboard',

  DASHBOARD_USER_MANAGEMENT = '/dashboard/users',
  DASHBOARD_USER_DETAIL = '/dashboard/users/[id]',
  DASHBOARD_USER_EDIT = '/dashboard/users/[id]/edit',
  DASHBOARD_USER_CREATE = '/dashboard/users/create',
  DASHBOARD_USER_DELETE = '/dashboard/users/[id]/delete'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export const appRoutesConfigs: AppRoutesConfigs = {
  // Public routes
  [AppRoute.HOME]: {
    subject: Subject.PUBLIC,
    action: Action.READ
  },
  [AppRoute.AUTH_SIGN_IN]: {
    subject: Subject.PUBLIC,
    action: Action.READ
  },
  [AppRoute.AUTH_SIGN_UP]: {
    subject: Subject.PUBLIC,
    action: Action.READ
  },
  [AppRoute.AUTH_FORGOT_PASSWORD]: {
    subject: Subject.PUBLIC,
    action: Action.READ
  },

  // Authenticated routes
  [AppRoute.PROFILE]: {
    subject: Subject.AUTHENTICATED,
    action: Action.READ,
    onReject: () => redirect(StatusCodes.TEMPORARY_REDIRECT, AppRoute.AUTH_SIGN_IN)
  },
  [AppRoute.SETTINGS]: {
    subject: Subject.AUTHENTICATED,
    action: Action.READ,
    onReject: () => redirect(StatusCodes.TEMPORARY_REDIRECT, AppRoute.AUTH_SIGN_IN)
  },
  [AppRoute.SCHEDULE]: {
    subject: Subject.AUTHENTICATED,
    action: Action.READ,
    onReject: () => redirect(StatusCodes.TEMPORARY_REDIRECT, AppRoute.AUTH_SIGN_IN)
  },
  [AppRoute.AUTH_SIGN_OUT]: {
    subject: Subject.AUTHENTICATED,
    action: Action.READ
  },

  // Admin routes
  [AppRoute.DASHBOARD]: {
    subject: Subject.DASHBOARD,
    action: Action.READ
  },
  [AppRoute.DASHBOARD_USER_MANAGEMENT]: {
    subject: Subject.USER,
    action: Action.MANAGE
  },
  [AppRoute.DASHBOARD_USER_DETAIL]: {
    subject: Subject.USER,
    action: Action.MANAGE
  },
  [AppRoute.DASHBOARD_USER_EDIT]: {
    subject: Subject.USER,
    action: Action.MANAGE
  },
  [AppRoute.DASHBOARD_USER_CREATE]: {
    subject: Subject.USER,
    action: Action.MANAGE
  },
  [AppRoute.DASHBOARD_USER_DELETE]: {
    subject: Subject.USER,
    action: Action.MANAGE
  }
};
