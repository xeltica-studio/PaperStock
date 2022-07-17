import { User } from '@prisma/client';

export type ApiSigninResponse = Pick<User,
  | 'id'
  | 'createdAt'
  | 'name'
  | 'role'
  | 'accessToken'
>;
