import { Module, Global } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtGlobalModule {}
