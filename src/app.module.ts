import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { RouterModule } from '@nestjs/core/router';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { DatabaseModule } from './modules/database/database.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtGlobalModule } from './modules/jwt/jwt.module';
import { LoggingModule } from './modules/logging/logging.module';
import { LoggingMiddleware } from './modules/logging/logging.middleware';

@Module({
  imports: [
    UserModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    DatabaseModule,
    AuthModule,
    LoggingModule,
    JwtGlobalModule,
    ArtistModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'user',
        module: UserModule,
      },
      {
        path: 'album',
        module: AlbumModule,
      },
      {
        path: 'artist',
        module: ArtistModule,
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
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
