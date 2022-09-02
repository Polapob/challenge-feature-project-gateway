import { Controller, Get, Injectable, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { SpotifyOAuthService } from './spotifyOAuth.service';

interface ISpotifyOAuthController {
  redirectToSpotifyOAuth: (res: Response) => Promise<void>;
  refreshAccessToken: (req: Request) => Promise<{ access_token: string }>;
}

@Controller('media-player-service/auth')
@Injectable()
export class SpotifyOAuthController implements ISpotifyOAuthController {
  constructor(private readonly spotifyOAuthService: SpotifyOAuthService) {}

  @Get('/login')
  async redirectToSpotifyOAuth(@Res() res: Response) {
    try {
      const loginURL = await this.spotifyOAuthService.getSpotifyLoginURL();
      res.redirect(loginURL);
    } catch (err) {
      console.log(err);
    }
  }
  @Post('/refresh')
  async refreshAccessToken(@Req() req: Request) {
    const { refresh_token } = req.cookies;
    const { access_token } = await this.spotifyOAuthService.refreshAccessToken(
      refresh_token,
    );
    return {
      access_token,
    };
  }
}
