import { sleep } from '@/common/helper';
import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService<AppConfig>, private userService: UserService) {
    const googleLoginConfig = configService.get<AppConfig['googleLogin']>('googleLogin');

    if (!googleLoginConfig.GOOGLE_CLIENT_ID) {
      throw new Error('GOOGLE_CLIENT_ID is missing');
    }
    if (!googleLoginConfig.GOOGLE_CLIENT_SECRET) {
      throw new Error('GOOGLE_CLIENT_SECRET is missing');
    }
    if (!googleLoginConfig.GOOGLE_CLIENT_CALLBACK_URL) {
      throw new Error('GOOGLE_CLIENT_CALLBACK_URL is missing');
    }

    super({
      clientID: googleLoginConfig.GOOGLE_CLIENT_ID,
      clientSecret: googleLoginConfig.GOOGLE_CLIENT_SECRET,
      callbackURL: googleLoginConfig.GOOGLE_CLIENT_CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    /**
     * 避免 https://github.com/jaredhanson/passport-google-oauth2/issues/87
     *
     * 不使用 sleep 的話，上述 issue 裡有人推 fork 版的 (升級 child package.json node-oauth 版本)
     * https://github.com/serniebanders/passport-google-oauth2.git
     */
    await sleep(50);

    let user = await this.userService.findUserByGoogleLogin(profile);
    if (!user) user = await this.userService.createUserFromGoogleLogin(profile);
    done(null, user);
  }
}
