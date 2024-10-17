import { Module, Global } from '@nestjs/common';
import { DatabaseClientService } from './services/database-client.service';

@Global()
@Module({
  providers: [DatabaseClientService],
  exports: [DatabaseClientService],
})
export class DatabaseModule {}
