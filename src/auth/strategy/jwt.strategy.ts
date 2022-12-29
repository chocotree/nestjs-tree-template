import { errorMessage } from '@/common/errorMessage';
import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService<AppConfig>, private userService: UserService) {
    const jwtSecret = configService.get<AppConfig['JWT_SECRET']>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is missing');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    const id = payload.sub;
    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new UnauthorizedException(errorMessage.userNotFound);
    }

    return user;
  }
}
