import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'name',
      passwordField: 'pwd',
    });
  }

  async validate(name: string, password: string) {
    const user = this.authService.validateUser(name, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
