import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided or invalid scheme');
    }

    try {
      const token = authHeader.split(' ')[1];

      this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
