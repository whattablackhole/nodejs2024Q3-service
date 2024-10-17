import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto, UpdateUserDto } from 'src/models/dtos/user';
import { DatabaseClientService } from 'src/modules/database/services/database-client.service';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entity.exception';
import { User } from 'src/types/user';
import { PasswordMismatchException } from '../exceptions/user.exception';

@Injectable()
export class UserService {
  constructor(private dbClient: DatabaseClientService) {}

  async user(id: string): Promise<User> {
    const user = this.dbClient.get(`user:${id}`);

    if (!user) {
      throw new EntityNotFoundException('User');
    }

    return Promise.resolve(user);
  }

  async users(): Promise<User[]> {
    return Promise.resolve(this.dbClient.getAll(`user`));
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = {
      createdAt: new Date().getTime(),
      id: randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      updatedAt: new Date().getTime(),
      version: 1,
    };

    this.dbClient.add(`user:${user.id}`, user);

    return Promise.resolve(user);
  }

  async updateUser({
    data,
    id,
  }: {
    data: UpdateUserDto;
    id: string;
  }): Promise<User> {
    const user = this.dbClient.get(`user:${id}`) as User | null;

    if (!user) {
      throw new EntityNotFoundException('User');
    }

    if (user.password !== data.oldPassword) {
      throw new PasswordMismatchException();
    }

    user.password = data.newPassword;
    user.version = user.version + 1;
    user.updatedAt = new Date().getTime();
    this.dbClient.put(`user:${id}`, user);

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const result = this.dbClient.delete(`user:${id}`);

    if (!result) {
      throw new EntityNotFoundException('User');
    }

    return Promise.resolve();
  }
}
