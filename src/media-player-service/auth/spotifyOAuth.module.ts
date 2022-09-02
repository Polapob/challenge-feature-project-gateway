import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MEDIA_PLAYER_SERVICE_BASE_URL } from '../const';
import { SpotifyOAuthController } from './spotifyOAuth.controller';
import { SpotifyOAuthService } from './spotifyOAuth.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: MEDIA_PLAYER_SERVICE_BASE_URL,
      timeout: 5000,
      withCredentials: true,
    }),
  ],
  providers: [SpotifyOAuthService],
  controllers: [SpotifyOAuthController],
  exports: [SpotifyOAuthModule],
})
export class SpotifyOAuthModule {}
