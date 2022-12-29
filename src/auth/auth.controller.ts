import { LoginDto } from '@/dto/request/login.dto';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags('auth api')
@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.localLogin(req.user);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('login/google')
  async googleLogin() {} // eslint-disable-line

  @UseGuards(GoogleAuthGuard)
  @Get('auth/google/callback')
  async googleAuthCallback(@Request() req) {
    return this.authService.googleLogin(req.user);
  }
}
