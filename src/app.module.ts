import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { RouterModule } from '@nestjs/core/router';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    UserModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    DatabaseModule,
    RouterModule.register([
      {
        path: 'user',
        module: UserModule,
      },
      {
        path: 'album',
        module: AlbumModule,
      },
      {
        path: 'track',
        module: TrackModule,
      },
      {
        path: 'favs',
        module: FavoritesModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
