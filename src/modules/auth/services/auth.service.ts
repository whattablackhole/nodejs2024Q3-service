import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { Credentials } from 'src/models/dtos/auth';
import { ActionForbidden } from 'src/exceptions/auth.exception';
import { DatabaseClientService } from 'src/modules/database/services/database-client.service';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private dbClient: DatabaseClientService,
  ) {}

  public async signup(credentials: Credentials) {
    credentials.password = await hash(
      credentials.password,
      process.env.CRYPT_SALT || 10,
    );
    const user = await this.userService.createUser(credentials);
    return user;
  }

  public async login(credentials: Credentials) {
    const user = await this.userService.user({ login: credentials.login });

    const isPasswordValid = await compare(credentials.password, user.password);

    if (!isPasswordValid) {
      throw new ActionForbidden('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }
  public async refresh(refreshToken: string) {
    const refreshTokenData = await this.dbClient.refreshToken.findUnique({
      where: { id: refreshToken },
      include: { user: true },
    });

    if (refreshTokenData === null) {
      throw new ActionForbidden('Invalid token');
    }

    if (refreshTokenData.expire.getTime() < Date.now()) {
      throw new ActionForbidden('Refresh token expired');
    }
    const accessToken = this.generateAccessToken(refreshTokenData.user);
    const newRefreshToken = await this.generateRefreshToken(
      refreshTokenData.user,
    );

    return { accessToken, refreshToken: newRefreshToken };
  }

  private generateAccessToken(user: User) {
    return this.jwtService.sign(
      { userId: user.id, login: user.login },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
      },
    );
  }

  private async generateRefreshToken(user: User) {
    try {
      await this.dbClient.refreshToken.delete({ where: { userId: user.id } });
    } finally {
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 14);

      return await this.dbClient.refreshToken
        .create({
          data: { userId: user.id, expire: expireDate },
        })
        .then((data) => data.id);
    }
  }
}
