import { User } from '@/user/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async validateUser(name: string, pwd: string): Promise<any> {
    // const user = await this.usersService.findOne(name);
    // if (user && user.pwd === pwd) {
    //   const { pwd, ...rest } = user;
    //   return rest;
    // }
    // return null;
    console.log(name, pwd);
    return 'wait for local';
  }

  async localLogin(user: any) {
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async googleLogin(user: User) {
    const payload = { sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
