import { Controller, Get, Injectable, Post, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { SpotifyOAuthService } from './spotifyOAuth.service';

interface ISpotifyOAuthController {
  getSpotifyLoginURL: () => Promise<void>;
  refreshAccessToken: (req: Request) => Promise<{ access_token: string }>;
}

@Controller('media-player-service/auth')
@Injectable()
export class SpotifyOAuthController implements ISpotifyOAuthController {
  constructor(private readonly spotifyOAuthService: SpotifyOAuthService) {}

  @Get('/login')
  async getSpotifyLoginURL() {
    const response = await this.spotifyOAuthService.getSpotifyLoginURL();
    return response;
  }
  @Post('/refresh')
  async refreshAccessToken(@Req() req: Request) {
    const { refresh_token } = req.cookies;
    const response = await this.spotifyOAuthService.refreshAccessToken(
      refresh_token,
    );
    return response;
  }
}
