import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SpotifyOAuthModule } from './media-player-service/auth/spotifyOAuth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.local', isGlobal: true }),
    SpotifyOAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
