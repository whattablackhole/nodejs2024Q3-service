import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/models/dtos/user';
import { DatabaseClientService } from 'src/modules/database/services/database-client.service';
import { EntityNotFoundException } from 'src/exceptions/entity.exception';
import { User } from 'src/types/user';
import { PasswordMismatchException } from '../exceptions/user.exception';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private dbClient: DatabaseClientService) {}

  async user(userWhereUniqueInput: Prisma.UserWhereInput): Promise<User> {
    const user = await this.dbClient.user.findFirst({
      where: userWhereUniqueInput,
    });

    if (!user) {
      throw new EntityNotFoundException('User');
    }

    return user;
  }

  async users(): Promise<User[]> {
    return await this.dbClient.user.findMany();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: Prisma.UserCreateInput = {
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
    };

    return await this.dbClient.user.create({
      data: user,
    });
  }

  async updateUser({
    data,
    where,
  }: {
    data: UpdateUserDto;
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User> {
    const user = await this.dbClient.user.findUnique({
      where: where,
      select: { password: true, version: true },
    });

    if (!user) {
      throw new EntityNotFoundException('User');
    }

    if (user.password !== data.oldPassword) {
      throw new PasswordMismatchException();
    }

    return await this.dbClient.user.update({
      where: where,
      data: {
        password: data.newPassword,
        version: { increment: 1 },
        updatedAt: new Date(),
      },
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<void> {
    try {
      await this.dbClient.user.delete({
        where,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new EntityNotFoundException('User');
      }
      throw error;
    }
  }
}
