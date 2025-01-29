import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
  id: number;
  username: string;
  email: string;

  @Exclude()
  password: string;

  roleId: number;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
