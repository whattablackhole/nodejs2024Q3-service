import { HttpException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto, UpdateUserDto } from 'src/models/dtos/user';
import { DatabaseClientService } from 'src/modules/database/services/database-client.service';
import { User } from 'src/types/user';

@Injectable()
export class UserService {
  constructor(private dbClient: DatabaseClientService) {}

  async user(id: string): Promise<User> {
    const user = this.dbClient.get(`user:${id}`);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return Promise.resolve(user);
  }

  async users(): Promise<User[]> {
    return Promise.resolve(this.dbClient.getAll(`user`));
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    let user: User = {
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
    let user = this.dbClient.get(`user:${id}`) as User | null;

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (user.password !== data.oldPassword) {
      throw new HttpException('Old password is wrong', 403);
    }

    user.password = data.newPassword;

    this.dbClient.put(`user:${id}`, user);

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const result = this.dbClient.delete(`user:${id}`);

    if (!result) {
      throw new HttpException('User not found', 404);
    }
    return Promise.resolve();
  }
}
