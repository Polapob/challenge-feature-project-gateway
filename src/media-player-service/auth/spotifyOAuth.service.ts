import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IRefreshAccessTokenResponse } from './interface/service.interface';

interface ISpotifyOAuthService {
  getSpotifyLoginURL: () => Promise<string>;
  refreshAccessToken: (
    refreshToken: string,
  ) => Promise<IRefreshAccessTokenResponse>;
}

@Injectable()
export class SpotifyOAuthService implements ISpotifyOAuthService {
  constructor(private readonly httpService: HttpService) {}

  async getSpotifyLoginURL() {
    const {
      data: { loginURL },
    } = await this.httpService.axiosRef.get('auth/login');
    return loginURL;
  }

  async refreshAccessToken(refreshToken: string) {
    const response =
      await this.httpService.axiosRef.post<IRefreshAccessTokenResponse>(
        'auth/refresh',
        {},
        {
          headers: {
            Cookie: `refresh_token=${refreshToken};`,
          },
        },
      );

    return response.data;
  }
}
