import { Module } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
