import type { DecodedIdToken } from 'firebase-admin/auth';

export enum Role {
  ADMIN = 'admin',
  USER = 'user'
}

export type User = DecodedIdToken & {
  role: Role;
};
